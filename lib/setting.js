const author = '@dandisubhani_'
loghandler = {
    error: {
        status: false,
        code: 503,
        message: '[!] Service Unavaible Or Error',
        maintanied_by: `${author}`
    },
    noturl: {
      status: false,
      code: 403,
      message: '[!] Forbiden or Error, Invlid url',
      maintanied_by: `${author}`
    },
    notfound: {
      status: false,
      code: 404,
      message: '[!] Forbiden or Error, Not Found',
      maintanied_by: `${author}`
    },
    notid: {
      status: false,
      code: 404,
      message: '[!] Forbiden or Error, Invalid Id or Zone',
      maintanied_by: `${author}`
    },
    redy: {
      status: false,
      code: 403,
      message: '[!] Forbiden or Error, Alias ​​already in use',
      maintanied_by: `${author}`
    },
    emoji: {
      status: false,
      code: 403,
      message: '[!] Forbiden or Error, Emoji not Found',
      maintanied_by: `${author}`
  },
    instgram: {
      status: false,
      code: 403,
      message: '[!] Forbiden or Error, Username tidak wujud atau account private',
      maintanied_by: `${author}`
   },
    register: {
      status: false,
      code: 403,
      message: '[!] Please Register First',
  },
   verify: {
      status: false,
      code: 403,
      message: '[!] Please Verify Email',
}

}