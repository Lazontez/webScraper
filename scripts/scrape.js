const axios = require("axios");
const cheerio = require("cheerio");


const spaceNew = (cb) => {
    axios.get("https://techxplore.com/latest-news/")
        .then((response) => {
            let $ = cheerio.load(response.data);

            let c = 0;
            let news = []
            $("article").each((i, ele) => {
                $(".text-middle").each((i, element) => {

                    let currentNews = {
                        header: $(element).text(),
                        link: $(element).children("a").attr('href'),
                        description: $(element).next().text().trim()
                    }
                    if (c < 10 && currentNews.header != "Today's News") {
                        news.push(currentNews)
                        c++;
                    }

                });

            })
            // console.log('Scraper -> ', news[1]);
            return cb(news)
        }).catch((err) => {
            console.log(err)
        });

};

module.exports = spaceNew
