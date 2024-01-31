require('./lib/setting')
const express = require('express');
const axios = require('axios');
const app = express();
const googleIt = require('google-it')
const { ytMp4, ytMp3, youtube } = require('./lib/y2mate')
const ds = require('./lib/listdl')
const author = '@dandisubhani_';

app.use(express.static('dashboard'));

//function
async function getBuffer(url, options) {
  try {
    options ? options : {}
    const res = await axios({
      method: "get",
      url,
      headers: {
        'DNT': 1,
        'Upgrade-Insecure-Request': 1
      },
      ...options,
      responseType: 'arraybuffer'
    })
    return res.data
  } catch (err) {
    return err
  }
}
//Downloader

app.get('/api/downloader/facebook', async (req, res) => {
  const url = req.query.url;
  const apiUrl = `https://vihangayt.me/download/fb?url=${url}`;
  if (!url) return res.json({ status: false, creator: `${author}`, message: "[!] masukan parameter url" })
  await axios.get(apiUrl).then(data => {
    const hasil = data.data.data
    if (!hasil) return res.json(loghandler.noturl)

    const result = {
      status: 200,
      creator: author,
      result: hasil
    };
    const prettyResult = JSON.stringify(result, null, 2);
    res.setHeader('Content-Type', 'application/json');
    res.send(prettyResult);
    console.log(prettyResult);
  }).catch(e => {
    res.json(loghandler.noturl)
  })
})

app.get('/api/downloader/yt', async (req, res) => {
  const url = req.query.url;
  const apiUrl = `https://vihangayt.me/download/ytmp4?url=${url}`;
  if (!url) return res.json({ status: false, creator: `${author}`, message: "[!] masukan parameter url" })
  await axios.get(apiUrl).then(data => {
    const hasil = data.data.data
    if (!hasil) return res.json(loghandler.noturl)

    const result = {
      status: 200,
      creator: author,
      result: hasil
    };
    const prettyResult = JSON.stringify(result, null, 2);
    res.setHeader('Content-Type', 'application/json');
    res.send(prettyResult);
    console.log(prettyResult);
  }).catch(e => {
    res.json(loghandler.noturl)
  })
})

app.get('/api/downloader/fbdown', async (req, res, next) => {
  var url = req.query.url
  if (!url) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter url" })
  ds.fbdown(url).then(data => {
    if (!data.Normal_video) return res.json(loghandler.noturl)

    const result = {
      status: 200,
      creator: `${author}`,
      result: data
    }
    const prettyResult = JSON.stringify(result, null, 2);
    res.setHeader('Content-Type', 'application/json');
    res.send(prettyResult);
    console.log(prettyResult);
  })
    .catch(e => {
      res.json(loghandler.error)
    })
})

app.get('/api/downloader/ytplay', async (req, res, next) => {
  var text1 = req.query.q
  if (!text1) return res.json({ status: false, creator: `${author}`, message: "[!] masukan parameter text" })

  let yts = require("yt-search")
  let search = await yts(text1)
  let url = search.all[0]
  var mp3 = await ytMp3(url.url)
  var mp4 = await ytMp4(url.url)
  if (!mp4 || !mp3) return res.json(loghandler.noturl)
  res.json({
    status: true,
    creator: `${author}`,
    result: {
      title: mp4.title,
      desc: mp4.desc,
      thum: mp4.thumb,
      view: mp4.views,
      channel: mp4.channel,
      ago: url.ago,
      timestamp: url.timestamp,
      uploadDate: mp4.uploadDate,
      author: url.author,
      mp4: {
        result: mp4.result,
        size: mp4.size,
        quality: mp4.quality
      },
      mp3: {
        result: mp3.result,
        size: mp3.size
      }
    }
  })

})

app.get('/api/downloader/tiktok', async (req, res, next) => {
  var url = req.query.url
  if (!url) return res.json({ status: false, creator: `${author}`, message: "[!] masukan parameter url" })
  ds.musically(url).then(data => {
    if (!data) return res.json(loghandler.noturl)
    const result = {
      status: 200,
      creator: `${author}`,
      result: data
    }
    const prettyResult = JSON.stringify(result, null, 2);
    res.setHeader('Content-Type', 'application/json');
    res.send(prettyResult);
    console.log(prettyResult);
  }).catch(e => {
    res.json(loghandler.noturl)
  })
})


app.get('/api/downloader/tiktok2', async (req, res) => {
  const url = req.query.url;
  const apiUrl = `https://vihangayt.me/download/tiktok2?url=${url}`;
  if (!url) return res.json({ status: false, creator: `${author}`, message: "[!] masukan parameter url" })
  await axios.get(apiUrl).then(data => {
    const hasil = data.data.data
    if (!hasil) return res.json(loghandler.noturl)
    const result = {
      status: 200,
      creator: author,
      result: hasil
    };

    const prettyResult = JSON.stringify(result, null, 2);
    res.setHeader('Content-Type', 'application/json');
    res.send(prettyResult);
    console.log(prettyResult);
  }).catch(e => {
    res.json(loghandler.noturl)
  })
})

app.get('/api/downloader/instagram', async (req, res) => {
  const url = req.query.url;
  const apiUrl = `https://vihangayt.me/download/instagram?url=${url}`;
  if (!url) return res.json({ status: false, creator: `${author}`, message: "[!] masukan parameter url" })
  await axios.get(apiUrl).then(data => {
    const hasil = data.data.data
    if (!hasil) return res.json(loghandler.noturl)
    const result = {
      status: 200,
      creator: author,
      result: hasil
    };
    const prettyResult = JSON.stringify(result, null, 2);
    res.setHeader('Content-Type', 'application/json');
    res.send(prettyResult);
    console.log(prettyResult);
  }).catch(e => {
    res.json(loghandler.noturl)
  })
})

app.get('/api/downloader/twitter', async (req, res, next) => {
  var url = req.query.url
  if (!url) return res.json({ status: false, creator: `${author}`, message: "[!] masukan parameter url" })
  ds.twitter(url).then(data => {
    if (!data.video) return res.json(loghandler.noturl)
    const result = {
      status: 200,
      creator: `${author}`,
      result: data
    }
    const prettyResult = JSON.stringify(result, null, 2);
    res.setHeader('Content-Type', 'application/json');
    res.send(prettyResult);
    console.log(prettyResult);
  }).catch(e => {
    res.json(loghandler.error)
  })
})

app.get('/api/downloader/mediafire', async (req, res, next) => {
  var url = req.query.url
  if (!url) return res.json({ status: false, creator: `${creator}`, message: "[!] masukan parameter url" })
  ds.mediafiredl(url).then(async (data) => {
    if (!data) return res.json(loghandler.noturl)
    const result = {
      status: 200,
      creator: `${author}`,
      result: data
    }
    const prettyResult = JSON.stringify(result, null, 2);
    res.setHeader('Content-Type', 'application/json');
    res.send(prettyResult);
    console.log(prettyResult);
  }).catch(e => {
    res.json(loghandler.noturl)
  })
})

app.get('/api/downloader/threads', async (req, res) => {
  const url = req.query.url;
  const apiUrl = `https://vihangayt.me/download/threads?url=${url}`;
  if (!url) return res.json({ status: false, creator: `${author}`, message: "[!] masukan parameter url" })
  await axios.get(apiUrl).then(data => {
    const hasil = data.data.data
    if (!hasil) return res.json(loghandler.noturl)
    const result = {
      status: 200,
      creator: author,
      result: hasil
    };
    const prettyResult = JSON.stringify(result, null, 2);
    res.setHeader('Content-Type', 'application/json');
    res.send(prettyResult);
    console.log(prettyResult);
  }).catch(e => {
    res.json(loghandler.noturl)
  })
})

app.get('/api/downloader/gdrive', async (req, res) => {
  const url = req.query.url;
  const apiUrl = `https://vihangayt.me/download/gdrive?url=${url}`;
  if (!url) return res.json({ status: false, creator: `${author}`, message: "[!] masukan parameter url" })
  await axios.get(apiUrl).then(data => {
    const hasil = data.data.data
    if (!hasil) return res.json(loghandler.noturl)
    const result = {
      status: 200,
      creator: author,
      result: hasil
    };
    const prettyResult = JSON.stringify(result, null, 2);
    res.setHeader('Content-Type', 'application/json');
    res.send(prettyResult);
    console.log(prettyResult);
  }).catch(e => {
    res.json(loghandler.noturl)
  })
})

app.get('/api/downloader/soundcloud', async (req, res) => {
  const url = req.query.url;
  const apiUrl = `https://vihangayt.me/download/soundcloud?url=${url}`;
  if (!url) return res.json({ status: false, creator: `${author}`, message: "[!] masukan parameter url" })
  await axios.get(apiUrl).then(data => {
    const hasil = data.data.data
    if (!hasil) return res.json(loghandler.noturl)
    const result = {
      status: 200,
      creator: author,
      result: hasil
    };
    const prettyResult = JSON.stringify(result, null, 2);
    res.setHeader('Content-Type', 'application/json');
    res.send(prettyResult);
    console.log(prettyResult);
  }).catch(e => {
    res.json(loghandler.noturl)
  })
})

app.get('/api/downloader/sfilemobi', async (req, res, next) => {
  var url = req.query.url
  if (!url) return res.json({ status: false, creator: `${author}`, message: "[!] masukan parameter url" })
  ds.sfilemobi(url).then(data => {
    if (!data) return res.json(loghandler.noturl)
    const result = {
      status: 200,
      creator: `${author}`,
      result: data
    }
    const prettyResult = JSON.stringify(result, null, 2);
    res.setHeader('Content-Type', 'application/json');
    res.send(prettyResult);
    console.log(prettyResult);
  }).catch(e => {
    res.json(loghandler.noturl)
  })
})

//search
app.get('/api/search/lirik', async (req, res) => {
  const query = req.query.q;
  const apiUrl = `https://vihangayt.me/search/lyrics?q=${query}`;
  if (!query) return res.json({ status: false, creator: `${author}`, message: "[!] masukan parameter query" })
  await axios.get(apiUrl).then(data => {
    const hasil = data.data.data
    if (!hasil) return res.json(loghandler.noturl)
    const result = {
      status: 200,
      creator: author,
      result: hasil
    };
    const prettyResult = JSON.stringify(result, null, 2);
    res.setHeader('Content-Type', 'application/json');
    res.send(prettyResult);
    console.log(prettyResult);
  }).catch(e => {
    res.json(loghandler.noturl)
  })
})

app.get('/api/search/scloud', async (req, res) => {
  const query = req.query.q;
  const apiUrl = `https://vihangayt.me/search/soundcloud?q=${query}`;
  if (!query) return res.json({ status: false, creator: `${author}`, message: "[!] masukan parameter query" })
  await axios.get(apiUrl).then(data => {
    const hasil = data.data.data
    if (!hasil) return res.json(loghandler.noturl)
    const result = {
      status: 200,
      creator: author,
      result: hasil
    };
    const prettyResult = JSON.stringify(result, null, 2);
    res.setHeader('Content-Type', 'application/json');
    res.send(prettyResult);
    console.log(prettyResult);
  }).catch(e => {
    res.json(loghandler.noturl)
  })
})

app.get('/api/search/sticker', async (req, res) => {
  const query = req.query.q;
  const apiUrl = `https://vihangayt.me/search/sticker?q=${query}`;
  if (!query) return res.json({ status: false, creator: `${author}`, message: "[!] masukan parameter query" })
  await axios.get(apiUrl).then(data => {
    const hasil = data.data.data
    if (!hasil) return res.json(loghandler.noturl)
    const result = {
      status: 200,
      creator: author,
      result: hasil
    };
    const prettyResult = JSON.stringify(result, null, 2);
    res.setHeader('Content-Type', 'application/json');
    res.send(prettyResult);
    console.log(prettyResult);
  }).catch(e => {
    res.json(loghandler.noturl)
  })
})

app.get('/api/search/linkgroupwa', async (req, res, next) => {
  var text1 = req.query.text
  if (!text1) return res.json({ status: false, creator: `${author}`, message: "[!] masukan parameter text" })
  ds.linkwa(text1).then((data) => {
    if (!data[0]) return res.json(loghandler.notfound)
    const result = {
      status: 200,
      creator: `${author}`,
      result: data
    }
    const prettyResult = JSON.stringify(result, null, 2);
    res.setHeader('Content-Type', 'application/json');
    res.send(prettyResult);
    console.log(prettyResult);
  }).catch((err) => {
    res.json(loghandler.notfound)
  })
})

app.get('/api/search/pinterest', async (req, res, next) => {
  var text1 = req.query.text
  if (!text1) return res.json({ status: false, creator: `${author}`, message: "[!] masukan parameter text" })
  ds.pinterest(text1).then((data) => {
    if (!data[0]) return res.json(loghandler.notfound)

    const result = {
      status: 200,
      creator: `${author}`,
      result: data
    }
    const prettyResult = JSON.stringify(result, null, 2);
    res.setHeader('Content-Type', 'application/json');
    res.send(prettyResult);
    console.log(prettyResult);
  }).catch((err) => {
    res.json(loghandler.notfound)
  })
})


app.get('/api/search/ringtone', async (req, res, next) => {
  var text1 = req.query.text
  if (!text1) return res.json({ status: false, creator: `${author}`, message: "[!] masukan parameter text" })
  ds.ringtone(text1).then((data) => {
    if (!data) return res.json(loghandler.notfound)

    const result = {
      status: 200,
      creator: `${author}`,
      result: data
    }
    const prettyResult = JSON.stringify(result, null, 2);
    res.setHeader('Content-Type', 'application/json');
    res.send(prettyResult);
    console.log(prettyResult);
  }).catch((err) => {
    res.json(loghandler.notfound)
  })
})


app.get('/api/search/wikimedia', async (req, res, next) => {
  var text1 = req.query.text
  if (!text1) return res.json({ status: false, creator: `${author}`, message: "[!] masukan parameter text" })
  ds.wikimedia(text1).then((data) => {
    if (!data[0]) return res.json(loghandler.notfound)

    const result = {
      status: 200,
      creator: `${author}`,
      result: data
    }
    const prettyResult = JSON.stringify(result, null, 2);
    res.setHeader('Content-Type', 'application/json');
    res.send(prettyResult);
    console.log(prettyResult);
  }).catch((err) => {
    res.json(loghandler.notfound)
  })
})


app.get('/api/search/wallpaper', async (req, res, next) => {
  var text1 = req.query.text
  if (!text1) return res.json({ status: false, creator: `${author}`, message: "[!] masukan parameter text" })
  ds.wallpaper(text1).then((data) => {
    if (!data[0]) return res.json(loghandler.notfound)

    const result = {
      status: 200,
      creator: `${author}`,
      result: data
    }
    const prettyResult = JSON.stringify(result, null, 2);
    res.setHeader('Content-Type', 'application/json');
    res.send(prettyResult);
    console.log(prettyResult);
  }).catch((err) => {
    res.json(loghandler.notfound)
  })
})

app.get('/api/search/sfilemobi', async (req, res, next) => {
  var text1 = req.query.text
  if (!text1) return res.json({ status: false, creator: `${author}`, message: "[!] masukan parameter text" })
  ds.sfilemobiSearch(text1).then(data => {
    if (!data) return res.json(loghandler.notfound)

    const result = {
      status: 200,
      creator: `${author}`,
      result: data
    }
    const prettyResult = JSON.stringify(result, null, 2);
    res.setHeader('Content-Type', 'application/json');
    res.send(prettyResult);
    console.log(prettyResult);
  }).catch(e => {
    res.json(loghandler.error)
  })
})

app.get('/api/search/google', async (req, res, next) => {
  var text1 = req.query.text
  if (!text1) return res.json({ status: false, creator: `${author}`, message: "[!] masukan parameter text" })

  googleIt({ 'query': text1 }).then(results => {
    if (!results[0]) return res.json(loghandler.notfound)

    const result = {
      status: 200,
      creator: `${author}`,
      result: results
    }
    const prettyResult = JSON.stringify(result, null, 2);
    res.setHeader('Content-Type', 'application/json');
    res.send(prettyResult);
    console.log(prettyResult);
  }).catch(e => {
    res.json(loghandler.notfound)
  })
})

app.get('/api/search/googleimage', async (req, res, next) => {
  var text1 = req.query.text
  if (!text1) return res.json({ status: false, creator: `${author}`, message: "[!] masukan parameter text" })

  var gis = require('g-i-s')
  gis(text1, logResults)

  function logResults(error, results) {
    if (error) {
      res.json(loghandler.notfound)
    }
    else {
      if (!results[0]) return res.json(loghandler.notfound)

      const result = {
        status: 200,
        creator: `${author}`,
        result: results
      }
      const prettyResult = JSON.stringify(result, null, 2);
      res.setHeader('Content-Type', 'application/json');
      res.send(prettyResult);
      console.log(prettyResult);
    }
  }
})

//stalk
app.get('/api/stalk/instagram', async (req, res) => {
  const query = req.query.q;
  const apiUrl = `https://vihangayt.me/stalk/instagram?q=${query}`;
  if (!query) return res.json({ status: false, creator: `${author}`, message: "[!] masukan parameter query" })
  await axios.get(apiUrl).then(data => {
    const hasil = data.data.data
    if (!hasil.result === "error") return res.json(loghandler.noturl)
    const result = {
      status: 200,
      creator: author,
      result: hasil
    };
    const prettyResult = JSON.stringify(result, null, 2);
    res.setHeader('Content-Type', 'application/json');
    res.send(prettyResult);
    console.log(prettyResult);
  }).catch(e => {
    res.json(loghandler.noturl)
  })
})

app.get('/api/stalk/tiktok', async (req, res) => {
  const query = req.query.q;
  const apiUrl = `https://vihangayt.me/stalk/tiktok?q=${query}`;
  if (!query) return res.json({ status: false, creator: `${author}`, message: "[!] masukan parameter query" })
  await axios.get(apiUrl).then(data => {
    const hasil = data.data.data
    if (!hasil) return res.json(loghandler.noturl)
    const result = {
      status: 200,
      creator: author,
      result: hasil
    };
    const prettyResult = JSON.stringify(result, null, 2);
    res.setHeader('Content-Type', 'application/json');
    res.send(prettyResult);
    console.log(prettyResult);
  }).catch(e => {
    res.json(loghandler.noturl)
  })
})

app.get('/api/stalk/iplook', async (req, res) => {
  const query = req.query.q;
  const apiUrl = `https://vihangayt.me/stalk/ip?q=${query}`;
  if (!query) return res.json({ status: false, creator: `${author}`, message: "[!] masukan parameter query" })
  await axios.get(apiUrl).then(data => {
    const hasil = data.data.data
    if (!hasil) return res.json(loghandler.noturl)
    const result = {
      status: 200,
      creator: author,
      result: hasil
    };
    const prettyResult = JSON.stringify(result, null, 2);
    res.setHeader('Content-Type', 'application/json');
    res.send(prettyResult);
    console.log(prettyResult);
  }).catch(e => {
    res.json(loghandler.noturl)
  })
})

app.get('/api/stalk/githubuser', async (req, res) => {
  const query = req.query.q;
  const apiUrl = `https://vihangayt.me/stalk/githubuser?q=${query}`;
  if (!query) return res.json({ status: false, creator: `${author}`, message: "[!] masukan parameter query" })
  await axios.get(apiUrl).then(data => {
    const hasil = data.data.data
    if (!hasil) return res.json(loghandler.noturl)
    const result = {
      status: 200,
      creator: author,
      result: hasil
    };
    const prettyResult = JSON.stringify(result, null, 2);
    res.setHeader('Content-Type', 'application/json');
    res.send(prettyResult);
    console.log(prettyResult);
  }).catch(e => {
    res.json(loghandler.noturl)
  })
})

//―――――――――――――――――――――――――――――――――――――――――― ┏  Text Pro  ┓ ―――――――――――――――――――――――――――――――――――――――――― \\

app.get('/api/textpro/pencil', async (req, res, next) => {
  var text1 = req.query.text
  if (!text1) return res.json({ status: false, creator: `${author}`, message: "[!] masukan parameter text" })
  ds.textpro("https://textpro.me/create-a-sketch-text-effect-online-1044.html", [text1])
    .then((data) => {

      res.set({ 'Content-Type': 'image/png' })
      res.send(data)
    })
    .catch((err) => {
      res.json(loghandler.error)
    })
})


app.get('/api/textpro/glitch', async (req, res, next) => {
  var text1 = req.query.text
  if (!text1) return res.json({ status: false, creator: `${author}`, message: "[!] masukan parameter text" })
  ds.textpro("https://textpro.me/create-impressive-glitch-text-effects-online-1027.html", [text1])
    .then((data) => {

      res.set({ 'Content-Type': 'image/png' })
      res.send(data)
    })
    .catch((err) => {
      res.json(loghandler.error)
    })
})


app.get('/api/textpro/blackpink', async (req, res, next) => {
  var text1 = req.query.text
  if (!text1) return res.json({ status: false, creator: `${author}`, message: "[!] masukan parameter text" })
  ds.textpro("https://textpro.me/create-blackpink-logo-style-online-1001.html", [text1])
    .then((data) => {

      res.set({ 'Content-Type': 'image/png' })
      res.send(data)
    })
    .catch((err) => {
      res.json(loghandler.error)
    })
})


app.get('/api/textpro/berry', async (req, res, next) => {
  var text1 = req.query.text
  if (!text1) return res.json({ status: false, creator: `${author}`, message: "[!] masukan parameter text" })
  ds.textpro("https://textpro.me/create-berry-text-effect-online-free-1033.html", [text1])
    .then((data) => {

      res.set({ 'Content-Type': 'image/png' })
      res.send(data)
    })
    .catch((err) => {
      res.json(loghandler.error)
    })
})


app.get('/api/textpro/neon', async (req, res, next) => {
  var text1 = req.query.text
  if (!text1) return res.json({ status: false, creator: `${author}`, message: "[!] masukan parameter text" })
  ds.textpro("https://textpro.me/neon-light-text-effect-online-882.html", [text1])
    .then((data) => {

      res.set({ 'Content-Type': 'image/png' })
      res.send(data)
    })
    .catch((err) => {
      res.json(loghandler.error)
    })
})



app.get('/api/textpro/logobear', async (req, res, next) => {
  var text1 = req.query.text
  if (!text1) return res.json({ status: false, creator: `${author}`, message: "[!] masukan parameter text" })
  ds.textpro("https://textpro.me/online-black-and-white-bear-mascot-logo-creation-1012.html", [text1])
    .then((data) => {

      res.set({ 'Content-Type': 'image/png' })
      res.send(data)
    })
    .catch((err) => {
      res.json(loghandler.error)
    })
})


app.get('/api/textpro/3dchristmas', async (req, res, next) => {
  var text1 = req.query.text
  if (!text1) return res.json({ status: false, creator: `${author}`, message: "[!] masukan parameter text" })
  ds.textpro("https://textpro.me/3d-christmas-text-effect-by-name-1055.html", [text1])
    .then((data) => {

      res.set({ 'Content-Type': 'image/png' })
      res.send(data)
    })
    .catch((err) => {
      res.json(loghandler.error)
    })
})


app.get('/api/textpro/thunder', async (req, res, next) => {
  var text1 = req.query.text
  if (!text1) return res.json({ status: false, creator: `${author}`, message: "[!] masukan parameter text" })
  ds.textpro("https://textpro.me/online-thunder-text-effect-generator-1031.html", [text1])
    .then((data) => {

      res.set({ 'Content-Type': 'image/png' })
      res.send(data)
    })
    .catch((err) => {
      res.json(loghandler.error)
    })
})


app.get('/api/textpro/3dboxtext', async (req, res, next) => {
  var text1 = req.query.text
  if (!text1) return res.json({ status: false, creator: `${author}`, message: "[!] masukan parameter text" })
  ds.textpro("https://textpro.me/3d-box-text-effect-online-880.html", [text1])
    .then((data) => {

      res.set({ 'Content-Type': 'image/png' })
      res.send(data)
    })
    .catch((err) => {
      res.json(loghandler.error)
    })
})


app.get('/api/textpro/glitch2', async (req, res, next) => {
  var text1 = req.query.text
  var text2 = req.query.text2
  if (!text1) return res.json({ status: false, creator: `${author}`, message: "[!] masukan parameter text" })
  if (!text2) return res.json({ status: false, creator: `${author}`, message: "[!] masukan parameter text2" })
  ds.textpro("https://textpro.me/create-a-glitch-text-effect-online-free-1026.html", [text1, text2])
    .then((data) => {

      res.set({ 'Content-Type': 'image/png' })
      res.send(data)
    })
    .catch((err) => {
      res.json(loghandler.error)
    })
})

app.get('/api/textpro/glitchtiktok', async (req, res, next) => {
  var text1 = req.query.text
  var text2 = req.query.text2
  if (!text1) return res.json({ status: false, creator: `${author}`, message: "[!] masukan parameter text" })
  if (!text2) return res.json({ status: false, creator: `${author}`, message: "[!] masukan parameter text2" })
  ds.textpro("https://textpro.me/create-glitch-text-effect-style-tik-tok-983.html", [text1, text2])
    .then((data) => {

      res.set({ 'Content-Type': 'image/png' })
      res.send(data)
    })
    .catch((err) => {
      res.json(loghandler.error)
    })
})

app.get('/api/textpro/video-game-classic', async (req, res, next) => {
  var text1 = req.query.text
  var text2 = req.query.text2
  if (!text1) return res.json({ status: false, creator: `${author}`, message: "[!] masukan parameter text" })
  if (!text2) return res.json({ status: false, creator: `${author}`, message: "[!] masukan parameter text2" })
  ds.textpro("https://textpro.me/video-game-classic-8-bit-text-effect-1037.html", [text1, text2])
    .then((data) => {

      res.set({ 'Content-Type': 'image/png' })
      res.send(data)
    })
    .catch((err) => {
      res.json(loghandler.error)
    })
})

app.get('/api/textpro/marvel-studios', async (req, res, next) => {
  var text1 = req.query.text
  var text2 = req.query.text2
  if (!text1) return res.json({ status: false, creator: `${author}`, message: "[!] masukan parameter text" })
  if (!text2) return res.json({ status: false, creator: `${author}`, message: "[!] masukan parameter text2" })
  ds.textpro("https://textpro.me/create-logo-style-marvel-studios-online-971.html", [text1, text2])
    .then((data) => {

      res.set({ 'Content-Type': 'image/png' })
      res.send(data)
    })
    .catch((err) => {
      res.json(loghandler.error)
    })
})

app.get('/api/textpro/ninja-logo', async (req, res, next) => {
  var text1 = req.query.text
  var text2 = req.query.text2
  if (!text1) return res.json({ status: false, creator: `${author}`, message: "[!] masukan parameter text" })
  if (!text2) return res.json({ status: false, creator: `${author}`, message: "[!] masukan parameter text2" })
  ds.textpro("https://textpro.me/create-ninja-logo-online-935.html", [text1, text2])
    .then((data) => {

      res.set({ 'Content-Type': 'image/png' })
      res.send(data)
    })
    .catch((err) => {
      res.json(loghandler.error)
    })
})

app.get('/api/textpro/green-horror', async (req, res, next) => {
  var text1 = req.query.text
  if (!text1) return res.json({ status: false, creator: `${author}`, message: "[!] masukan parameter text" })
  ds.textpro("https://textpro.me/create-green-horror-style-text-effect-online-1036.html", [text1])
    .then((data) => {

      res.set({ 'Content-Type': 'image/png' })
      res.send(data)
    })
    .catch((err) => {
      res.json(loghandler.error)
    })
})

app.get('/api/textpro/magma', async (req, res, next) => {
  var text1 = req.query.text
  if (!text1) return res.json({ status: false, creator: `${author}`, message: "[!] masukan parameter text" })
  ds.textpro("https://textpro.me/create-a-magma-hot-text-effect-online-1030.html", [text1])
    .then((data) => {

      res.set({ 'Content-Type': 'image/png' })
      res.send(data)
    })
    .catch((err) => {
      res.json(loghandler.error)
    })
})

app.get('/api/textpro/3d-neon-light', async (req, res, next) => {
  var text1 = req.query.text
  if (!text1) return res.json({ status: false, creator: `${author}`, message: "[!] masukan parameter text" })
  ds.textpro("https://textpro.me/create-3d-neon-light-text-effect-online-1028.html", [text1])
    .then((data) => {

      res.set({ 'Content-Type': 'image/png' })
      res.send(data)
    })
    .catch((err) => {
      res.json(loghandler.error)
    })
})

app.get('/api/textpro/3d-orange-juice', async (req, res, next) => {
  var text1 = req.query.text
  if (!text1) return res.json({ status: false, creator: `${author}`, message: "[!] masukan parameter text" })
  ds.textpro("https://textpro.me/create-a-3d-orange-juice-text-effect-online-1084.html", [text1])
    .then((data) => {

      res.set({ 'Content-Type': 'image/png' })
      res.send(data)
    })
    .catch((err) => {
      res.json(loghandler.error)
    })
})

app.get('/api/textpro/chocolate-cake', async (req, res, next) => {
  var text1 = req.query.text
  if (!text1) return res.json({ status: false, creator: `${author}`, message: "[!] masukan parameter text" })
  ds.textpro("https://textpro.me/chocolate-cake-text-effect-890.html", [text1])
    .then((data) => {

      res.set({ 'Content-Type': 'image/png' })
      res.send(data)
    })
    .catch((err) => {
      res.json(loghandler.error)
    })
})

app.get('/api/textpro/strawberry', async (req, res, next) => {
  var text1 = req.query.text
  if (!text1) return res.json({ status: false, creator: `${author}`, message: "[!] masukan parameter text" })
  ds.textpro("https://textpro.me/strawberry-text-effect-online-889.html", [text1])
    .then((data) => {

      res.set({ 'Content-Type': 'image/png' })
      res.send(data)
    })
    .catch((err) => {
      res.json(loghandler.error)
    })
})

//―――――――――――――――――――――――――――――――――――――――――― ┏  Phootoxy  ┓ ―――――――――――――――――――――――――――――――――――――――――― \\


app.get('/api/photooxy/flaming', async (req, res, next) => {
  var text1 = req.query.text
  if (!text1) return res.json({ status: false, creator: `${author}`, message: "[!] masukan parameter text" })
  ds.photooxy("https://photooxy.com/logo-and-text-effects/realistic-flaming-text-effect-online-197.html", [text1])
    .then((data) => {

      res.set({ 'Content-Type': 'image/png' })
      res.send(data)
    })
    .catch((err) => {
      res.json(loghandler.error)
    })
})


app.get('/api/photooxy/shadow-sky', async (req, res, next) => {
  var text1 = req.query.text
  if (!text1) return res.json({ status: false, creator: `${author}`, message: "[!] masukan parameter text" })
  ds.photooxy("https://photooxy.com/logo-and-text-effects/shadow-text-effect-in-the-sky-394.html", [text1])
    .then((data) => {

      res.set({ 'Content-Type': 'image/png' })
      res.send(data)
    })
    .catch((err) => {
      res.json(loghandler.error)
    })
})


app.get('/api/photooxy/metallic', async (req, res, next) => {
  var text1 = req.query.text
  if (!text1) return res.json({ status: false, creator: `${author}`, message: "[!] masukan parameter text" })
  ds.photooxy("https://photooxy.com/other-design/create-metallic-text-glow-online-188.html", [text1])
    .then((data) => {

      res.set({ 'Content-Type': 'image/png' })
      res.send(data)
    })
    .catch((err) => {
      res.json(loghandler.error)
    })
})


app.get('/api/photooxy/naruto', async (req, res, next) => {
  var text1 = req.query.text
  if (!text1) return res.json({ status: false, creator: `${author}`, message: "[!] masukan parameter text" })
  ds.photooxy("https://photooxy.com/manga-and-anime/make-naruto-banner-online-free-378.html", [text1])
    .then((data) => {

      res.set({ 'Content-Type': 'image/png' })
      res.send(data)
    })
    .catch((err) => {
      res.json(loghandler.error)
    })
})


app.get('/api/photooxy/pubg', async (req, res, next) => {
  var text1 = req.query.text
  if (!text1) return res.json({ status: false, creator: `${author}`, message: "[!] masukan parameter text" })
  var text2 = req.query.text2
  if (!text2) return res.json({ status: false, creator: `${author}`, message: "[!] masukan parameter text2" })
  ds.photooxy("https://photooxy.com/battlegrounds/make-wallpaper-battlegrounds-logo-text-146.html", [text1, text2])
    .then((data) => {

      res.set({ 'Content-Type': 'image/png' })
      res.send(data)
    })
    .catch((err) => {
      res.json(loghandler.error)
    })
})

app.get('/api/photooxy/under-grass', async (req, res, next) => {
  var text1 = req.query.text
  if (!text1) return res.json({ status: false, creator: `${author}`, message: "[!] masukan parameter text" })
  ds.photooxy("https://photooxy.com/logo-and-text-effects/make-quotes-under-grass-376.html", [text1])
    .then((data) => {

      res.set({ 'Content-Type': 'image/png' })
      res.send(data)
    })
    .catch((err) => {
      res.json(loghandler.error)
    })
})

app.get('/api/photooxy/harry-potter', async (req, res, next) => {
  var text1 = req.query.text
  if (!text1) return res.json({ status: false, creator: `${author}`, message: "[!] masukan parameter text" })
  ds.photooxy("https://photooxy.com/logo-and-text-effects/create-harry-potter-text-on-horror-background-178.html", [text1])
    .then((data) => {

      res.set({ 'Content-Type': 'image/png' })
      res.send(data)
    })
    .catch((err) => {
      res.json(loghandler.error)
    })
})

app.get('/api/photooxy/flower-typography', async (req, res, next) => {
  var text1 = req.query.text
  if (!text1) return res.json({ status: false, creator: `${author}`, message: "[!] masukan parameter text" })
  ds.photooxy("https://photooxy.com/art-effects/flower-typography-text-effect-164.html", [text1])
    .then((data) => {

      res.set({ 'Content-Type': 'image/png' })
      res.send(data)
    })
    .catch((err) => {
      res.json(loghandler.error)
    })
})

app.get('/api/photooxy/picture-of-love', async (req, res, next) => {
  var text1 = req.query.text
  if (!text1) return res.json({ status: false, creator: `${author}`, message: "[!] masukan parameter text" })
  ds.photooxy("https://photooxy.com/logo-and-text-effects/create-a-picture-of-love-message-377.html", [text1])
    .then((data) => {

      res.set({ 'Content-Type': 'image/png' })
      res.send(data)
    })
    .catch((err) => {
      res.json(loghandler.error)
    })
})

app.get('/api/photooxy/coffee-cup', async (req, res, next) => {
  var text1 = req.query.text
  if (!text1) return res.json({ status: false, creator: `${author}`, message: "[!] masukan parameter text" })
  ds.photooxy("https://photooxy.com/logo-and-text-effects/put-any-text-in-to-coffee-cup-371.html", [text1])
    .then((data) => {

      res.set({ 'Content-Type': 'image/png' })
      res.send(data)
    })
    .catch((err) => {
      res.json(loghandler.error)
    })
})

app.get('/api/photooxy/butterfly', async (req, res, next) => {
  var text1 = req.query.text
  if (!text1) return res.json({ status: false, creator: `${author}`, message: "[!] masukan parameter text" })
  ds.photooxy("https://photooxy.com/logo-and-text-effects/butterfly-text-with-reflection-effect-183.html", [text1])
    .then((data) => {

      res.set({ 'Content-Type': 'image/png' })
      res.send(data)
    })
    .catch((err) => {
      res.json(loghandler.error)
    })
})

app.get('/api/photooxy/night-sky', async (req, res, next) => {
  var text1 = req.query.text
  if (!text1) return res.json({ status: false, creator: `${author}`, message: "[!] masukan parameter text" })
  ds.photooxy("https://photooxy.com/logo-and-text-effects/write-stars-text-on-the-night-sky-200.html", [text1])
    .then((data) => {

      res.set({ 'Content-Type': 'image/png' })
      res.send(data)
    })
    .catch((err) => {
      res.json(loghandler.error)
    })
})


app.get('/api/photooxy/carved-wood', async (req, res, next) => {
  var text1 = req.query.text
  if (!text1) return res.json({ status: false, creator: `${author}`, message: "[!] masukan parameter text" })
  ds.photooxy("https://photooxy.com/logo-and-text-effects/carved-wood-effect-online-171.html", [text1])
    .then((data) => {

      res.set({ 'Content-Type': 'image/png' })
      res.send(data)
    })
    .catch((err) => {
      res.json(loghandler.error)
    })
})


app.get('/api/photooxy/illuminated-metallic', async (req, res, next) => {
  var text1 = req.query.text
  if (!text1) return res.json({ status: false, creator: `${author}`, message: "[!] masukan parameter text" })
  ds.photooxy("https://photooxy.com/logo-and-text-effects/illuminated-metallic-effect-177.html", [text1])
    .then((data) => {

      res.set({ 'Content-Type': 'image/png' })
      res.send(data)
    })
    .catch((err) => {
      res.json(loghandler.error)
    })
})

app.get('/api/photooxy/sweet-candy', async (req, res, next) => {
  var text1 = req.query.text
  if (!text1) return res.json({ status: false, creator: `${author}`, message: "[!] masukan parameter text" })
  ds.photooxy("https://photooxy.com/logo-and-text-effects/sweet-andy-text-online-168.html", [text1])
    .then((data) => {

      res.set({ 'Content-Type': 'image/png' })
      res.send(data)
    })
    .catch((err) => {
      res.json(loghandler.error)
    })
})

//tools
app.get('/api/tools/toanime', async (req, res) => {
  try {
    const url = req.query.url;
    const apiUrl = `https://vihangayt.me/tools/toanime?url=${url}`;
    const result = await getBuffer(apiUrl)
    res.set({ 'Content-Type': 'image/png' })
    res.send(result)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/tools/enhance', async (req, res) => {
  try {
    const url = req.query.url;
    const apiUrl = `https://vihangayt.me/tools/enhance?url=${url}`;
    const result = await getBuffer(apiUrl)
    res.set({ 'Content-Type': 'image/png' })
    res.send(result)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/tools/colorize', async (req, res) => {
  try {
    const url = req.query.url;
    const apiUrl = `https://vihangayt.me/tools/colorize?url=${url}`;
    const result = await getBuffer(apiUrl)
    res.set({ 'Content-Type': 'image/png' })
    res.send(result)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/tools/sspdf', async (req, res) => {
  try {
    const url = req.query.url;
    const apiUrl = `https://vihangayt.me/tools/sspdf?url=${url}`;
    const result = await getBuffer(apiUrl)
    res.set({ 'Content-Type': 'doc/pdf' })
    res.send(result)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/tools/attp', async (req, res) => {
  try {
    const query = req.query.q;
    const apiUrl = `https://vihangayt.me/maker/text2gif?q=${query}`;
    const result = await getBuffer(apiUrl)
    res.set({ 'Content-Type': 'image/gif' })
    res.send(result)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/tools/tempmail', async (req, res) => {
  try {
    const query = req.query.q;
    const apiUrl = `https://vihangayt.me/tools/tempmail`;

    const response = await axios.get(apiUrl);
    const data = response.data.data;

    const result = {
      status: 200,
      creator: author,
      result: data
    };

    const prettyResult = JSON.stringify(result, null, 2);
    res.setHeader('Content-Type', 'application/json');
    res.send(prettyResult);
    console.log(prettyResult);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/tools/get_inbox_tempmail', async (req, res) => {
  try {
    const query = req.query.q;
    if (!query) return res.json({ status: false, creator: `${author}`, message: "[!] masukan parameter id" })
    const apiUrl = `https://vihangayt.me/tools/get_inbox_tempmail?q=${query}`;

    const response = await axios.get(apiUrl);
    const data = response.data.data;

    const result = {
      status: 200,
      creator: author,
      result: data
    };

    const prettyResult = JSON.stringify(result, null, 2);
    res.setHeader('Content-Type', 'application/json');
    res.send(prettyResult);
    console.log(prettyResult);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/tools/ai', async (req, res) => {
  try {
    const query = req.query.q;
    const apiUrl = `https://vihangayt.me/tools/chatgpt?q=${query}`;

    const response = await axios.get(apiUrl);
    const data = response.data.data;

    const result = {
      status: 200,
      creator: author,
      result: data
    };

    const prettyResult = JSON.stringify(result, null, 2);
    res.setHeader('Content-Type', 'application/json');
    res.send(prettyResult);
    console.log(prettyResult);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/tools/ai2', async (req, res) => {
  try {
    const query = req.query.q;
    const apiUrl = `https://vihangayt.me/tools/chatgpt2?q=${query}`;

    const response = await axios.get(apiUrl);
    const data = response.data.data;

    const result = {
      status: 200,
      creator: author,
      result: data
    };

    const prettyResult = JSON.stringify(result, null, 2);
    res.setHeader('Content-Type', 'application/json');
    res.send(prettyResult);
    console.log(prettyResult);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/tools/ai3', async (req, res) => {
  try {
    const query = req.query.q;
    const apiUrl = `https://vihangayt.me/tools/chatgpt3?q=${query}`;

    const response = await axios.get(apiUrl);
    const data = response.data.data;

    const result = {
      status: 200,
      creator: author,
      result: data
    };

    const prettyResult = JSON.stringify(result, null, 2);
    res.setHeader('Content-Type', 'application/json');
    res.send(prettyResult);
    console.log(prettyResult);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


//end
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
