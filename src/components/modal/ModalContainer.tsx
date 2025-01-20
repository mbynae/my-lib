import { createPortal } from 'react-dom';

type Props = {
    isOpen: boolean;
    children: React.ReactNode;
};

const ModalContainer = ({ children, isOpen }: Props) => {
    return <>{isOpen && createPortal(children, document.getElementById('modal') as HTMLDivElement)}</>;
};

export default ModalContainer;
