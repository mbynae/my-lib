import { create } from 'zustand';

interface CommonModalParamsType {
    length: number;
    inputModalNum: (l: CommonModalParamsType['length']) => void;
}

export const commonModalParams = create<CommonModalParamsType>()((set) => ({
    length: 0,
    inputModalNum: (length) => set({ length: length }),
}));
