import { useState } from 'react';
import Button from '../../../../tailwind-components/button/Button';
import { useQuery } from '@tanstack/react-query';
import { callExampleQuery, useCallExampleQuery, useExampleMutate } from '../../../../api/hook/useExampleQuery';

interface Props {
    children: React.ReactNode;
}
const MainLayout = ({ children }: Props) => {
    // const [id, setId] = useState('');

    // const { data, isError, error } = useQuery({
    //     ...callExampleQuery({ id: id }),
    //     enabled: !!id,
    // });

    // const { data: exData } = useCallExampleQuery({ id: 'ud' }, { enabled: false });

    // const { mutate } = useExampleMutate({ gcTime: 0 });

    // // console.log(isError ? error : data);
    // const onPostEvent = (id: string) => {
    //     mutate(
    //         { id: id },
    //         {
    //             onSuccess: (data) => {
    //                 console.log(data);
    //             },
    //             onError: (error) => {
    //                 console.log(error);
    //             },
    //         },
    //     );
    // };

    return <main className="bg-theme-thin w-full">{children}</main>;
};

export default MainLayout;
