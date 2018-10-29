declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

// 允许使用window下的属性与变量, 必须
interface Window {
  [key:string]: any;
}

interface Vue {
  [key:string]: any;
}
