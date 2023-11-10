export const shadow = {
  /**
   * 큰 박스에 사용되는 그림자 입니다.
   * ex) 마이페이지 프로필, 마이페이지 탭, 문제 선택기 박스
   */
  boxShadow: `0.5rem 0.5rem 1.5625rem 0 rgba(0, 0, 0, 0.10)`,

  /**
   * 작은 박스에 사용되는 그림자입니다.
   * ex) 문제 선택기 박스 안에 있는 아이템
   */
  boxSmallShadow: `0 0.25rem 0.625rem 0 rgba(0, 0, 0, 0.10)`,

  /**
   * 랜딩 페이지의 시작 버튼에 사용되는 그림자입니다.
   */
  buttonLargeShadow: (y: number) => `0 ${y}px 0 0 #3056A2;`,
};
