import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Title = styled.h2`
  font-size: 32px;
  font-weight: bold;
  color: #333;
`;

const InputTitle = styled.label`
  display: ${(props) => props.display};
  font-size: 14px;
  font-weight: 600;
  color: #000;
`;

const InputTextWrap = styled.div`
  display: flex;
  padding: 10px 16px;
  border-radius: 6px;
  border: 1px solid #666;
  background: #fff;
  overflow: hidden;

  & input {
    width: 100%;
    height: 20px;
    font-size: 14px;
    font-weight: 400;
    outline: none;
    border: 0;
    &::placeholder {
      color: #999;
    }
  }

  &:focus-within {
    border-color: purple;
  }
`;
const ErrorMsg = styled.span`
  font-size: 12px;
  color: red;
`;

const BtnPrimary = styled.button`
  display: ${(props) => props.display};
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 48px;
  font-weight: 600;
  text-align: center;
  border-radius: ${(props) => props.radius};
  background: #9e30f4;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  border: 0;
  outline: none;

  &:disabled {
    background: #dadada;
  }
`;

const dummyUser = {
  email: "example@example.com",
  password: "asdf1234!@",
};
console.log(dummyUser);

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [notAllow, setNotAllow] = useState(true);

  const handleEmail = (e) => {
    setEmail(e.target.value);
    const regex =
      /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if (regex.test(e.target.value)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
    const regex =
      /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
    if (regex.test(e.target.value)) {
      setPasswordValid(true);
    } else {
      setPasswordValid(false);
    }
  };

  const onClickconfirm = () => {
    if (email === dummyUser.email && password === dummyUser.password) {
      alert("로그인 성공!");
    } else {
      alert("등록되지 않은 회원입니다");
    }
  };

  useEffect(() => {
    if (emailValid && passwordValid) {
      setNotAllow(false);
      return;
    }
    setNotAllow(true);
  }, [emailValid, passwordValid]);

  return (
    <>
      <section className="login-wrapper">
        <div className="login-top">
          <Title>
            이메일과 비밀번호를
            <br /> 입력해주세요.
          </Title>
          {/* content */}
          <InputTitle>이메일</InputTitle>
          <InputTextWrap>
            <input
              type="text"
              placeholder="example@example.com"
              value={email}
              onChange={handleEmail}
            />
          </InputTextWrap>
          {!emailValid && email.length > 0 && (
            // 조건에 따른 text rending
            // 정규표현식
            // input label 연결 , form html 웹접근성 적용
            // styled component분리 ,  for문 (가능시)
            // 정규표현식, focus-within
            // 성공 애니메이션
            // ✔️ Input창 선택에 따라 border 색상 변경
            // ✔️ Input 태그의 value, onChange Props에 useState 활용하기
            // ✔️ 자바스크립트 정규표현식(regex)을 활용한 Input창 입력 형식 제한
            // ✔️ 이메일, 비밀번호 입력완료를 체크하는 state 값에 따라 하단 버튼 disabled 속성 변경
            <ErrorMsg>올바른 이메일을 입력해주세요.</ErrorMsg>
          )}
          {/* password */}
          <InputTitle display="block">비밀번호</InputTitle>
          <InputTextWrap>
            <input
              type="password"
              placeholder="영문,숫자,특수문자 포함 8자 이상 입력해주세요."
              value={password}
              onChange={handlePassword}
            />
          </InputTextWrap>
          {!passwordValid && password.length > 0 && (
            <ErrorMsg> 영문,숫자, 특수문자포함 8자이상 입력해주세요.</ErrorMsg>
          )}
        </div>
        {/* button */}
        <div>
          <BtnPrimary
            display="flex"
            radius="24px"
            disabled={notAllow}
            onClick={onClickconfirm}
          >
            확인
          </BtnPrimary>
        </div>
      </section>
    </>
  );
}

// ✅ imp / ✅ nfn / rfc
