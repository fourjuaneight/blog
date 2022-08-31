/// 2>/dev/null ; gorun "$0" "$@" ; exit $?

package main

import (
	"bytes"
	"image"
	"image/jpeg"
	"log"
	"os"
	"path/filepath"
	"regexp"
	"strconv"
	"strings"
	"time"

	"github.com/disintegration/imaging"
	"github.com/go-rod/rod"
	"github.com/go-rod/rod/lib/devices"
	"github.com/go-rod/rod/lib/proto"
	"github.com/samber/lo"
	lop "github.com/samber/lo/parallel"
)

var site = "https://cleverlaziness.xyz"

func dist() string {
	// create src directory
	wd, err := os.Getwd()
	if err != nil {
		log.Fatal("[io.Getwd]:", err)
	}
	// go up one directory
	dist := filepath.Join(wd, "dist/")

	return dist
}

func cleanScripts() {
	var files []string
	// runtime variables
	now := time.Now()
	unix := now.Unix()
	dist := dist()

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
		log.Print("[os.ReadFile]:", err)
		return
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

func socialImgs() {
	var routes []string
	dist := dist()

	// match patterns
	typeMatch := regexp.MustCompile(`(.*\/)(social\.svg)$`)

	// get files
	filepath.Walk(dist, func(path string, info os.FileInfo, err error) error {
		if err != nil {
			log.Fatal("[socialImgs][filepath.Glob]:", err)
		}
		// filter files
		match := typeMatch.MatchString(path)

		// only save matches
		if !info.IsDir() && match {
			cleanPath := strings.Replace(path, dist, site, -1)
			routes = append(routes, cleanPath)
		}

		return nil
	})

	// take screenshots
	browser := rod.New().MustConnect().NoDefaultDevice()
	lop.ForEach(routes, func(route string, _ int) {
		// visit route
		page := browser.MustPage(route).MustEmulate(devices.LaptopWithHiDPIScreen)
		page.SetViewport(&proto.EmulationSetDeviceMetricsOverride{
			Width:  1200 * 1.5,
			Height: 630 * 1.5,
		})
		// take screenshot
		imgBytes := page.MustWaitLoad().MustScreenshot("social.jpeg")
		time.Sleep(1000)
		// create image
		distPath := strings.Replace(route, site, dist, -1)
		cleanPath := typeMatch.ReplaceAllString(distPath, "$1")
		imgFile, err := os.Create(filepath.Join(cleanPath, "social.jpeg"))
		if err != nil {
			log.Fatal("[socialImgs][os.Create]:", err)
		}
		defer imgFile.Close()
		// encode image
		img, _, err := image.Decode(bytes.NewReader(imgBytes))
		if err != nil {
			log.Fatal("[socialImgs][image.Decode]:", err)
		}
		dstImg := imaging.Resize(img, 1200, 630, imaging.Lanczos)
		err = jpeg.Encode(imgFile, dstImg, &jpeg.Options{Quality: 100})
		if err != nil {
			log.Fatal("[socialImgs][jpeg.Encode]:", err)
		}
	})
}

func main() {
	log.Println("Generating SW cache list")
	cleanScripts()
	log.Println("Creating social images")
	socialImgs()
}
