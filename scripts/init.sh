#!/bin/bash

echo "GSM template for Next.js"
echo "아키텍쳐를 선택해주세요"
echo

options=("atomic" "fsd")
selected=0
total=${#options[@]}

tput civis

print_options() {
  local idx=0
  for opt in "${options[@]}"; do
    if [ $idx -eq $selected ]; then
      echo "> $opt"
    else
      echo "  $opt"
    fi
    idx=$((idx + 1))
  done
}

while true; do
  tput sc
  
  print_options
  
  read -sn1 key

  tput rc
  for ((i=0; i<$total; i++)); do
    tput el
    tput cud1
  done
  tput rc

  case $key in
    "A")
      if [ $selected -gt 0 ]; then
        selected=$((selected - 1))
      fi
      ;;
    "B")
      if [ $selected -lt $((total - 1)) ]; then
        selected=$((selected + 1))
      fi
      ;;
    "")
      STRUCTURE=${options[$selected]}
      break
      ;;
  esac
done

tput cnorm


if [ -d "./src" ]; then
  echo
  echo "[0/6] 기존 src 디렉토리 삭제..."
  echo
  rm -rf ./src
fi

echo "[1/6] tsconfig.json 복사..."
echo
cp "./setup/$STRUCTURE/tsconfig.json" ./tsconfig.json

echo "[2/6] .prettierrc 복사..."
echo
cp "./setup/$STRUCTURE/.prettierrc" ./.prettierrc

echo "[3/6] $STRUCTURE 구조 복사..."
echo
mkdir -p src
cp -R "./setup/$STRUCTURE/src/"* ./src/


spinner() {
  local frames='-\|/'
  local pid=$1
  local i=0
  tput civis
  while kill -0 $pid 2>/dev/null; do
    i=$(( (i+1) % ${#frames} ))
    printf "\r[4/6] 패키지 설치... %c" "${frames:$i:1}"
    sleep 0.1
  done
  tput cnorm
  printf "\n"
}

npm install > npm.log 2>&1 &
pid=$!

spinner $pid

wait $pid
if [ $? -ne 0 ]; then
  echo "패키지 설치 중 오류가 발생했습니다. npm.log 파일을 확인해주세요"
  exit 1
else
  rm -f npm.log
fi

echo

if [ ! -f ".env.local" ]; then
  echo "[5/6] 환경 변수 파일 생성..."
  echo
  echo "NEXT_PUBLIC_API_URL=your_api_url" > .env.local
  echo "NEXT_PUBLIC_GA_ID=your_google_analytics_id" >> .env.local
else
  echo "[5/6] .env.local 파일이 이미 있으니 생성하지 않을게요"
  echo
fi

if [ $? -eq 0 ]; then
  echo "[6/6] 임시 파일 정리..."
  echo
  rm -rf ./setup
  rm -rf ./scripts
else 
  echo "[6/6] 어라.. 임시 파일이 없네요?"
  echo
fi

echo
echo "설치가 완료되었습니다!"
echo ".env.local 파일의 환경 변수를 실제 값으로 수정해주세요"
echo