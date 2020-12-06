# usage
1. server 폴더 안에 있는 config 폴더 안에 dev.js 파일을 생성한다.
2. MongoDB와 연결하기 위해서 dev.js file에 module.exports = { mongoURI: << MongoDB 주소 >> } 를 입력한다.
3. root directory에서 "npm install" 을 입력한다. (백엔드 종속성(dependencies) 다운로드)
4. client directory에서 "npm install" 을 입력한다. (프론트엔드 종속성(dependencies) 다운로드)
5. "npm run dev" 를 입력하여 백엔드, 프론트엔드 동시에 실행 가능하다.