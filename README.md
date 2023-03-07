# My Todo List App
투두리스트 앱을 통해 해야할 일을 등록하고 관리할 수 있습니다.

## Key Features
- 기본적인 Todo CRUD 기능
- 완료한 Todo와 미완료 Todo를 구분해서 볼 수 있는 기능
- 오늘을 기준으로 어제의 Todo, 오늘의 Todo, 내일의 Todo를 구분하여 볼 수 있는 페이지
- 다크 모드
- 웹, 모바일 반응형 페이지 구현
- json 서버를 이용한 데이터 저장

## Install
```
$ npm install
```

## Usage
- client
```
$ npm run start
```
- server
```
$ cd data
$ json-server --watch data.json --port 3001
```

## Usage example
- Create Todo

![Mar-02-2023 22-04-49](https://user-images.githubusercontent.com/115632555/222436786-09834819-5a26-4021-a77c-400a52af38e7.gif)

- Read Todo

![Mar-02-2023 22-25-36](https://user-images.githubusercontent.com/115632555/222441256-5c619bc6-cdb2-43d7-8091-3a1050b2ac85.gif)

- Update Todo

![Mar-02-2023 22-28-08](https://user-images.githubusercontent.com/115632555/222442050-cc21e4ab-82c8-41d7-b1f5-510282fb43d4.gif)

- Delete Todo

![Mar-02-2023 23-05-00](https://user-images.githubusercontent.com/115632555/222450858-b4d8f503-9fba-4e85-be74-2569b7af274a.gif)

