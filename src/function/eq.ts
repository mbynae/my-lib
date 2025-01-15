//Equal 함수
type EqType = { readonly equal: <T>(x: T, y: T) => boolean };
const eq: EqType = { equal: (x, y) => x === y }; //2개의 인자 동일값 체크

type ElemType = (E: EqType) => <T>(as: Array<T>, a: T) => boolean;
const elem: ElemType = E => (as, a) => {
    const result = as.some(item => E.equal(item, a));
    return result;
}; //배열에 인자 포함 체크

type ElemCType = (E: EqType) => <T>(as: Array<T>) => (a: T) => boolean;
const elemC: ElemCType = E => as => a => {
    const result = as.some(item => E.equal(item, a));
    return result;
}; //배열에 인자 포함 체크 커링 버전

const arrElem = elem(eq);
const arrElemC = elemC(eq);

type ArrEqCheck = <T>(as1: T[], as2: T[]) => boolean;
const arrEqCheck: ArrEqCheck = (as1, as2) => {
    const setAs2 = new Set(as2);
    return as1.every(Set.prototype.has, setAs2);
}; // 두 배열이 같은지 체크

export const Eq = { eq, arrElem, arrElemC, arrEqCheck };
