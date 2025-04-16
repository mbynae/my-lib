import { useLoaderData, useParams } from 'react-router';
import '../../../pages/view-transition/cross-fade-page.css';

const CrossFadeContents = () => {
    const { id = 1 } = useParams();
    const data = useLoaderData();
    console.log(data);

    return (
        <article className="flex w-full items-center justify-center" style={{ viewTransitionName: 'cross-fade' }}>
            <img
                src={`${import.meta.env.VITE_APP_BASE_URL}/src/assets/cross-fade${id}.png`}
                alt="큰 사진"
                className="w-[45rem] rounded-[10px]"
            />
        </article>
    );
};

export default CrossFadeContents;
