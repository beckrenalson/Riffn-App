import { useNavigate } from "react-router-dom"

function BackBtn() {

    const navigate = useNavigate();

    return (
        <>
  
                <div className="p-5">
                    <div onClick={() => navigate(-1)} className="cursor-pointer">
                        <img
                            className="h-5 w-7"
                            src="/images/back.png"
                            style={{ filter: 'invert(1)' }}
                            />
                    </div>
                </div>
       
        </>
    )
}

export default BackBtn