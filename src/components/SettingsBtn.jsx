import { useNavigate } from "react-router";

function SettingsBtn() {
    const navigate = useNavigate()

    return (
        <>
            <div className="p-5">
                <button onClick={() => navigate("/settings")}>
                    <img
                        className="h-7"
                        src="./public/images/settings.png"
                        style={{ filter: 'invert(1)' }}
                    />
                </button>
            </div>
        </>
    )
}

export default SettingsBtn