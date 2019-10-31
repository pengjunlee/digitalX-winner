
const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'http://pic.ik123.com/uploads/allimg/151130/3-151130115125.gif',
    name: 'admin',
    nickName: '管理员'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'http://pic.ik123.com/uploads/allimg/170109/3-1F10Z91059.gif',
    name: 'editor',
    nickName: '编辑'
  }
}

export default [
  // 用户登录
  {
    url: '/user/login',
    type: 'post',
    response: config => {
      const { username } = config.body
      const { token } = tokens[username]
      // 模拟异常
      if (!token) {
        return {
          code: 201,
          message: '输入的用户名或密码错误'
        }
      }
      const info = users[token]
      return {
        code: 0,
        message: '登录成功',
        token: token,
        data: info
      }
    }
  },

  // 获取用户信息
  {
    url: '/user/info\.*',
    type: 'get',
    response: config => {
      const { name } = config.query
      const { token } = tokens[name]
      if (token) {
        var info = users[token]
      }
      // 模拟异常
      if (!info) {
        return {
          code: 0,
          message: '获取用户信息失败'
        }
      }
      return {
        code: 0,
        data: info
      }
    }
  },

  // 退出登录
  {
    url: '/user/logout',
    type: 'get',
    response: _ => {
      return {
        code: 0,
        message: '退出登录'
      }
    }
  },
  // 修改密码
  {
    url: '/password/update',
    type: 'post',
    response: config => {
      const { password } = config.body
      // 模拟异常
      if (!password) {
        return {
          code: -3,
          message: '提交失败'
        }
      }
      return {
        code: 0,
        message: '密码修改成功',
        newPassword: password
      }
    }
  },
  {
    url: '/user/list',
    type: 'get',
    response: config => {
      return {
        'code': 0,
        'message': '用户数据加载成功',
        'data': {
          'total': 2,
          'rows': [
            {
              'id': 1,
              'name': 'admin',
              'nickName': '管理员',
              'introduction': '天行健，君子以自强不息。',
              'avatar': 'http://pic.ik123.com/uploads/allimg/151130/3-151130115125.gif',
              'roles': ['admin'],
              'locked': false,
              'updatedTime': '2019-09-03 18:31:44'
            },
            {
              'id': 2,
              'name': 'grathon',
              'nickName': '灰先生',
              'introduction': '地势坤，君子以厚德载物。',
              'avatar': 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
              'roles': ['editor'],
              'locked': true,
              'updatedTime': '2019-09-03 18:31:44'
            }
          ]
        }
      }
    }
  },
  {
    url: '/user/create',
    type: 'post',
    response: config => {
      const newUser = config.body
      newUser.id = 5
      newUser.avatar = 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
      return {
        code: 0,
        data: newUser
      }
    }
  },

  {
    url: '/user/update',
    type: 'post',
    response: _ => {
      return {
        code: 0,
        data: 'success'
      }
    }
  }
]

