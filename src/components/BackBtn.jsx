import { Router, useNavigate } from "react-router"

function BackBtn() {

    const navigate = useNavigate();

    return (
        <>
  
                <div className="p-5">
                    <div onClick={() => navigate(-1)} className="cursor-pointer">
                        <img
                            className="h-5 w-7"
                            src="./src/assets/back.png" />
                    </div>
                </div>
       
        </>
    )
}

export default BackBtn