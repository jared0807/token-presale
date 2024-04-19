import styled from "styled-components";

/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call */
export const StyledButton = styled.button`
  cursor: pointer;
  width: auto;
  height: 42px;
  padding: 9px 17px;
  background: #eb3d29;
  color: #fff; /* text-gray-700 */
  font-size: 1rem; /* text-base */
  font-weight: 500; /* font-medium */
  font-family: "Inter", sans-serif;
  line-height: normal; /* leading-normal */
  border-radius: 0.375rem; /* rounded-md */
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); /* shadow */
  display: inline-flex;
  justify-content: center;
  align-items: center;

  &::before {
    content: url("/icons/svg/wallet-add.svg");
    width: 24px;
    height: 24px;
    margin-right: 12px;
  }
`;

/*Analytics signin*/
/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call */
export const StyledButtonAnalytics = styled.button`
  cursor: pointer;
  width: 100%;
  height: 42px;
  padding: 9px 17px;
  background: #fff;
  color: #374151; /* text-gray-700 */
  font-size: 1rem; /* text-base */
  font-weight: 500; /* font-medium */
  font-family: "Inter", sans-serif;
  line-height: normal; /* leading-normal */
  border-radius: 0.375rem; /* rounded-md */
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); /* shadow */
  display: inline-flex;
  justify-content: center;
  align-items: center;

  &::before {
    content: url("/icons/svg/wallet-add-gray.svg");
    width: 24px;
    height: 24px;
    margin-right: 12px;
  }
`;

/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call */
export const StyledButtonAnalyticsModal = styled.button`
  cursor: pointer;
  width: 100%;
  height: 42px;
  padding: 9px 17px;
  background: #eb3d29;
  color: #fff;
  font-size: 1rem; /* text-base */
  font-weight: 500; /* font-medium */
  font-family: "Inter", sans-serif;
  line-height: normal; /* leading-normal */
  border-radius: 0.375rem; /* rounded-md */
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); /* shadow */
  display: inline-flex;
  justify-content: center;
  align-items: center;

  &::before {
    content: url("/icons/svg/wallet-add.svg");
    width: 24px;
    height: 24px;
    margin-right: 12px;
  }
`;
