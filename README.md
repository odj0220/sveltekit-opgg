# 시작하기

깃 레포를 클론 후 npm 을 이용하여 dependencies 를 설치 합니다.

```bash
git clone https://github.com/odj0220/sveltekit-opgg.git

# dependencies 설치
npm install
```

설치가 완료되면 development server 를 구동합니다.
```bash
npm run dev

# 또는 다음 명령어를 이용하여 서버 실행과 새로운 브라우져를 실행 합니다.
npm run dev -- --open
```

# 특이사항
### 챔피언 승률 부분 분당 cs 표기
mostInfo API를 이용하여 챔피언별 분당 cs 정보를 확인 할 수 없어서 해당 부분 제외했습니다.

### 매치 리스트 타입에 따라 필터링 되어야 합니다.
매치 리스트는 리스트 타입에 따라 필터를 했지만 매치 리스트 상단의 summary 부분은 데이터가 타입별로 구분이 불가능하고 매치 리스트를 이용하여 표기하는 의도가 아닌것 같아서 summary 부분은 필터를 적용하지 않았습니다.

### 매치 Summary 영역 킬 관여율을 승률로 표기
op.gg 사이트 참고시 킬 관여율이 표기되게 되어 있지만 해당 정보가 제공되지 않아서 색상표시 기준에 "KDA", "승률", "평점"이 있어서 그중 "승률"로 표기

### 매치 정보에 다시하기 타입이 없음
game 정보에 isWin 정보를 제외하고 다시하기에 대한 정보가 뭐인지 불분명하여 승리, 패배로만 작업

