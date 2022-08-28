/// 2>/dev/null ; gorun "$0" "$@" ; exit $?

package main

import (
	"log"
	"os"
	"path/filepath"
	"regexp"
	"strconv"
	"strings"
	"time"

	"github.com/samber/lo"
)

func init() {
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
