/// 2>/dev/null ; gorun "$0" "$@" ; exit $?

package main

import (
	"encoding/json"
	"io"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"regexp"
	"strconv"
	"strings"
	"time"

	"github.com/samber/lo"
	lop "github.com/samber/lo/parallel"
)

type Card struct {
	ID              string    `json:"id"`
	Name            string    `json:"name"`
	Colors          *[]string `json:"colors"`
	Type            string    `json:"type"`
	Set             string    `json:"set"`
	SetName         string    `json:"set_name"`
	OracleString    *string   `json:"oracle_string"`
	FlavorString    *string   `json:"flavor_string"`
	Rarity          string    `json:"rarity"`
	CollectorNumber int       `json:"collector_number"`
	ReleasedAt      string    `json:"released_at"`
	Artist          string    `json:"artist"`
	Image           string    `json:"image"`
	Back            *string   `json:"back"`
}

type ImgData struct {
	ID    string
	Image string
}

type BackData struct {
	ID   string
	Back string
}

type Shelf struct {
	ID        string `json:"id"`
	Name      string `json:"name"`
	Creator   string `json:"creator"`
	Rating    int    `json:"rating"`
	Cover     string `json:"cover"`
	Category  string `json:"category"`
	Genre     string `json:"genre"`
	Completed bool   `json:"completed"`
	Comments  string `json:"comments"`
}

type ShelfSet map[string][]Shelf

type Covers struct {
	ID    string
	Cover string
}

var endpoint = "https://cleverlaziness.xyz/api/"

func fetch(route string) []byte {
	resp, err := http.Get(endpoint + "shelf/")
	if err != nil {
		log.Fatal("[http]:", err)
	}

	resp.Header.Add("Content-Type", "application/json")

	defer resp.Body.Close()

	if resp.StatusCode != 200 {
		log.Fatal("[worker]:", err)
	}

	// read the response
	rest, err := io.ReadAll(resp.Body)
	if err != nil {
		log.Fatal("[io.ReadAll]:", err)
	}

	return rest
}

func getCardList() []Card {
	// read the response
	rest := fetch("mtg/")

	// unmarshal the response
	var cards []Card
	json.Unmarshal(rest, &cards)

	return cards
}

func getShelfList() []Shelf {
	// read the response
	rest := fetch("shelf/")

	// unmarshal the response
	var shelfSet ShelfSet
	json.Unmarshal(rest, &shelfSet)
	shelfStack := lo.Values(shelfSet)
	shelf := lo.Flatten(shelfStack)

	return shelf
}

func downloadSave(URL, dist string, fileName string) {
	output := filepath.Join(dist, filepath.Base(fileName))

	// check if file exists
	if _, err := os.Stat(output); os.IsNotExist(err) {
		// get the response bytes from the url
		response, err := http.Get(URL)
		if err != nil {
			log.Fatal("[http]:", err)
		}
		defer response.Body.Close()

		if response.StatusCode != 200 {
			log.Fatal("[b2]: Unable to download file", err)
		}

		// create a empty file
		file, err := os.Create(output)
		if err != nil {
			log.Fatal("[os.Create]:", err)
		}
		defer file.Close()

		// write the bytes to the fiel
		_, err = io.Copy(file, response.Body)
		if err != nil {
			log.Fatal("[io.Copy]:", err)
		}

		log.Println("[remote-images]:", fileName, "created")
	}
}

func mtg(data []Card, dir string) {
	// filter back images
	backData := lo.FilterMap(data, func(item Card, _ int) (BackData, bool) {
		if item.Back != nil {
			return BackData{
				ID:   item.ID,
				Back: *item.Back + "",
			}, true
		}

		return BackData{}, false
	})

	// create src directory
	var dist string
	wd, err := os.Getwd()
	if err != nil {
		log.Fatal("[io.Getwd]:", err)
	}
	dist = filepath.Join(wd, "assets/img/", dir)

	// create the directory if it doesn't exist
	if _, err := os.Stat(dist); os.IsNotExist(err) {
		err := os.Mkdir(dist, os.ModePerm)
		if err != nil {
			log.Fatal("[os.Mkdir]:", err)
		}
	}

	// save images
	lop.ForEach(data, func(item Card, _ int) {
		fileName := item.ID + ".png"

		downloadSave(item.Image, dist, fileName)
	})
	// save back images
	lop.ForEach(backData, func(item BackData, _ int) {
		fileName := item.ID + ".png"

		downloadSave(item.Back, dist, fileName)
	})
}

func shelf(data []Shelf, dir string) {
	// create src directory
	var dist string
	wd, err := os.Getwd()
	if err != nil {
		log.Fatal("[io.Getwd]:", err)
	}
	dist = filepath.Join(wd, "assets/img/", dir)

	// create the directory if it doesn't exist
	if _, err := os.Stat(dist); os.IsNotExist(err) {
		err := os.Mkdir(dist, os.ModePerm)
		if err != nil {
			log.Fatal("[os.Mkdir]:", err)
		}
	}

	// save images
	lop.ForEach(data, func(item Shelf, _ int) {
		fileName := item.ID + ".png"

		downloadSave(item.Cover, dist, fileName)
	})
}

func remoteImages(run bool) {
	if run {
		// save images
		mtgData := getCardList()
		mtg(mtgData, "mtg")

		shelfData := getShelfList()
		shelf(shelfData, "shelf")
	}
}

func cleanScripts(run bool) {
	if run {
		var files []string
		// runtime variables
		site := "https://cleverlaziness.xyz"
		now := time.Now()
		unix := now.Unix()

		// create src directory
		wd, err := os.Getwd()
		if err != nil {
			log.Fatal("[io.Getwd]:", err)
		}
		// go up one directory
		dist := filepath.Join(wd, "dist/")

		// create filter patterns
		typeIgnore := regexp.MustCompile(`.*(noise|sw).*\.js$`)
		typeMatch := regexp.MustCompile(`.*\.(js|css|woff|woff2)$`)

		// get files
		filepath.Walk(dist, func(path string, info os.FileInfo, err error) error {
			if err != nil {
				log.Fatal("[filepath.Glob]:", err)
			}
			// filter files
			ignore := typeIgnore.MatchString(path)
			matches := typeMatch.MatchString(path)

			// only save matches
			if !info.IsDir() && matches && !ignore {
				files = append(files, path)
			}

			return nil
		})
		files = lo.Map(files, func(item string, _ int) string {
			clean := strings.Replace(item, dist, "", -1)
			quotes := `"` + clean + `"`

			return quotes
		})

		// get service worker
		swRaw, err := os.ReadFile(filepath.Join(dist, "sw.js"))
		if err != nil {
			log.Fatal("[os.ReadFile]:", err)
		}
		sw := string(swRaw)

		// replace content
		assets := regexp.MustCompile(`\["staticAssets"\]`)
		baseURL := regexp.MustCompile(`baseURL`)
		version := regexp.MustCompile(`"version"`)
		swAssets := assets.ReplaceAllString(sw, "["+strings.Join(files, ",")+"]")
		swSite := baseURL.ReplaceAllString(swAssets, site)
		fmtSW := version.ReplaceAllString(swSite, `"`+strconv.FormatInt(unix, 10)+`"`)

		// replace sw.js
		newSW, err := os.Create(filepath.Join(dist, "sw.js"))
		if err != nil {
			log.Fatal("[os.Create]:", err)
		}
		defer newSW.Close()

		newSW.WriteString(fmtSW)
	}
}

func main() {
	remoteImages(false)
	cleanScripts(true)
}
