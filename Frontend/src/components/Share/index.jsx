import { FaShareSquare } from "react-icons/fa";

import { ShareContainer } from './styled';
import { toast } from "react-toastify";

function Share() {

    const handleShareClick = () => {
        (async () => {
            try {
                const url = window.location.href;
                await navigator.clipboard.writeText(url);
                return toast.success('URL copiada para a área de transferência!');
            }
            catch {
                return toast.error('Não foi possível copiar a URL!');
            }
        })();
    }

    return (
        <ShareContainer onClick={handleShareClick}>
            <FaShareSquare size={30}/>
            <h2>Compartilhar</h2>
        </ShareContainer>
    );

}

export default Share;