/**
 * navigate list
 *
 * @author: Storm
 * @date: 2018/08/09
 */

export default [
  {
    title: '产品管理',
    name: 'rProductList',
    icon: 'chanpinguanlix',
    id: 'P01'
  },
  {
    title: '资源管理',
    name: 'rSourceManageList',
    icon: 'ziyuanguanlix',
    id: 'R01'
  },
  {
    title: '资产管理',
    icon: 'zichanguanlix',
    launch: 0,
    children: [
      {
        title: '资产概览',
        name: 'rAssetOverview',
        id: 'A01001'
      },
      {
        title: '资产列表',
        name: 'rAssetList',
        id: 'A01002'
      }
    ],
    id: 'A01'
  },
  {
    title: '模型管理',
    icon: 'moxingguanlix',
    launch: 0,
    children: [{
      title: '产品模型管理',
      name: 'rModelProduct',
      id: 'M01001'
    },
    {
      title: '资源模型管理',
      name: 'rModelResource',
      id: 'M01002'
    },
    {
      title: '资产模型管理',
      name: 'rModelAssets',
      id: 'M01003'
    }],
    id: 'M01'
  },
  {
    title: '系统配置',
    icon: 'xitongpeizhix',
    launch: 0,
    children: [
      {
        title: '权限配置',
        name: 'rConfigLimit',
        id: 'S01001'
      },
      {
        title: '角色管理',
        name: 'rRoleManage',
        id: 'S01003'
      },
      {
        title: '用户组管理',
        name: 'rUserGroup',
        id: 'S01002'
      }
    ],
    id: 'S01'
  }
]
