//―――――――――――――――――――――――――――――――――――――――――― ┏ Modules ┓ ―――――――――――――――――――――――――――――――――――――――――― \\

const ytdl = require('ytdl-core');
const axios = require('axios');
const { millify } = require("millify")
const cheerio = require('cheerio')
//―――――――――――――――――――――――――――――――――――――――――― ┏ Api Youtube Downloader ┓ ―――――――――――――――――――――――――――――――――――――――――― \\

function bytesToSize(bytes) {
    return new Promise((resolve, reject) => {
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes === 0) return 'n/a';
        const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
        if (i === 0) resolve(`${bytes} ${sizes[i]}`);
        resolve(`${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`);
    });
  };

function ytMp4(url) {
    return new Promise((async(resolve, reject) => {
        ytdl.getInfo(url).then(async(getUrl) => {
            let result = [];
            for(let i = 0; i < getUrl.formats.length; i++) {
                let item = getUrl.formats[i];
                if (item.container == 'mp4' && item.hasVideo == true && item.hasAudio == true) {
                    let { qualityLabel, contentLength } = item;
                    let bytes = await bytesToSize(contentLength);
                    result[i] = {
                        video: item.url,
                        quality: qualityLabel,
                        size: bytes
                    };
                };
            }
            let resultFix = result.filter(x => x.video != undefined && x.size != undefined && x.quality != undefined) 
            let tiny = await axios.get(`https://tinyurl.com/api-create.php?url=${resultFix[0].video}`);
            let tinyUrl = tiny.data;
            let title = getUrl.videoDetails.title;
            let desc = getUrl.videoDetails.description;
            let views = millify(getUrl.videoDetails.viewCount)
            let channel = getUrl.videoDetails.ownerChannelName;
            let uploadDate = getUrl.videoDetails.uploadDate;
            let thumb = getUrl.player_response.microformat.playerMicroformatRenderer.thumbnail.thumbnails[0].url;
            resolve({
                title,
                result: resultFix[0].video,
                quality: resultFix[0].quality,
                size: resultFix[0].size,
                thumb,
                views,
                channel,
                uploadDate,
                desc
            });
        }).catch(err => {
          resolve()
      })
    }));
};

function ytMp3(url) {
    return new Promise((resolve, reject) => {
        ytdl.getInfo(url).then(async(getUrl) => {
            let result = [];
            for(let i = 0; i < getUrl.formats.length; i++) {
                let item = getUrl.formats[i];
                if (item.mimeType == 'audio/webm; codecs=\"opus\"') {
                    let { contentLength } = item;
                    let bytes = await bytesToSize(contentLength);
                    result[i] = {
                        audio: item.url,
                        size: bytes
                    };
                };
            };
            let resultFix = result.filter(x => x.audio != undefined && x.size != undefined) 
            let tiny = await axios.get(`https://tinyurl.com/api-create.php?url=${resultFix[0].audio}`);
            let tinyUrl = tiny.data;
            let title = getUrl.videoDetails.title;
            let desc = getUrl.videoDetails.description;
            let views = millify(getUrl.videoDetails.viewCount)
            let channel = getUrl.videoDetails.ownerChannelName;
            let uploadDate = getUrl.videoDetails.uploadDate;
            let thumb = getUrl.player_response.microformat.playerMicroformatRenderer.thumbnail.thumbnails[0].url;
            resolve({
                title,
                result: resultFix[0].audio,
                size: resultFix[0].size,
                thumb,
                views,
                channel,
                uploadDate,
                desc
            });
          }).catch(err => {
            resolve()
        })
    });
}

function youtube(link){
    return new Promise((resolve, reject) => {
        const ytIdRegex = /(?:http(?:s|):\/\/|)(?:(?:www\.|)youtube(?:\-nocookie|)\.com\/(?:watch\?.*(?:|\&)v=|embed\/|v\/)|youtu\.be\/)([-_0-9A-Za-z]{11})/
        if (ytIdRegex.test(link)) {
        let url =  ytIdRegex.exec(link)
        let config = {
            'url': 'https://www.youtube.be/' + url,
            'q_auto': 0,
            'ajax': 1
        }
        let headerss =  {
            "sec-ch-ua": '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
            "Cookie": 'PHPSESSID=6jo2ggb63g5mjvgj45f612ogt7; _ga=GA1.2.405896420.1625200423; _gid=GA1.2.2135261581.1625200423; _PN_SBSCRBR_FALLBACK_DENIED=1625200785624; MarketGidStorage={"0":{},"C702514":{"page":5,"time":1625200846733}}'
        }
    axios('https://www.y2mate.com/mates/en68/analyze/ajax',{
            method: 'POST',
            data: new URLSearchParams(Object.entries(config)),
            headers: headerss
        })
    .then(({ data }) => {
        const $ = cheerio.load(data.result)
        let img = $('div.thumbnail.cover > a > img').attr('src');
        let title = $('div.thumbnail.cover > div > b').text();
        let size = $('#mp4 > table > tbody > tr:nth-child(3) > td:nth-child(2)').text()
        let size_mp3 = $('#audio > table > tbody > tr:nth-child(1) > td:nth-child(2)').text()
        let id = /var k__id = "(.*?)"/.exec(data.result)[1]
        let configs = {
    type: 'youtube',
    _id: id,
    v_id: url[1],
    ajax: '1',
    token: '',
    ftype: 'mp4',
    fquality: 480
  }
    axios('https://www.y2mate.com/mates/en68/convert',{
        method: 'POST',
        data: new URLSearchParams(Object.entries(configs)),
        headers: headerss 
    })
    .then(({data}) => {
        const $ = cheerio.load(data.result)
        let link = $('div > a').attr('href')
    let configss = {
    type: 'youtube',
    _id: id,
    v_id: url[1],
    ajax: '1',
    token: '',
    ftype: 'mp3',
    fquality: 128
  }
    axios('https://www.y2mate.com/mates/en68/convert',{
        method: 'POST',
        data: new URLSearchParams(Object.entries(configss)),
        headers: headerss 
    })
    .then(({ data }) => {
        const $ = cheerio.load(data.result)
        let audio = $('div > a').attr('href')
        resolve({
            id: url[1],
            title: title,
            size: size,
            quality: '480p',
            thumb: img,
            link: link,
            size_mp3: size_mp3,
            mp3: audio
        })

        })
            })
        })
    .catch(reject)
    }else reject('link invalid')
    })
}


module.exports = { ytMp4, ytMp3, youtube};