# 시작하기

1. 프로젝트 세팅을 위해 다음 명령어를 꼭 입력해주세요.

   ```bash
   bash scripts/init.sh
   ```

   아키텍쳐를 atomic과 fsd 중 선택하여 사용할 수 있어요. 이걸 실행하면 `npm install`을 따로 하지 않아도 됩니다.

2. 환경변수를 실제 값으로 수정해주세요!
   
     ```
     NEXT_PUBLIC_API_URL=your_api_url
     ...
     ```
     
---

# 설치되는 의존성

 **Next.js `14.1.0` + React `^18.2.0` + TypeScript `^5.3.3`**

1. 🎨 UI 관련
   - Tailwind CSS `^4.1.10`
   - class-variance-authority `^0.7.1` - 조건부 클래스
   - clsx `^2.1.0` - 조건부 클래스 결합
   - lucide-react `^0.515.0` - 아이콘
   - sonner `^1.3.1` - 토스트

2. 🔄 API 관련
   - axios `^1.6.5` 
   - @tanstack/react-query `^5.17.19` - 서버 상태 관리

3. 📝 Form 관련
   - react-hook-form `^7.49.3` 
   - zod `^3.22.4` - 스키마 유효성 검증

4. 💻 코드 스타일
   - ESLint `^8.56.0` 
   - Prettier `^3.2.4` 

---