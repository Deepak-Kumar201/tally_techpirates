import { useContext } from "react";
import baseContext from "../../Context/baseContext";
import CheckBox from "./CheckBox";
import RadioBox from "./RadioBox";
import TextBox from "./TextBox";

export default function NewQue(props) {
    const fixNewQuePos = () => {
        const select = document.getElementById("select");
        if (select == null) return;
        select.style.top = window.scrollY + "px";
    };

    window.onscroll = fixNewQuePos;
    const hide = () => {
        context.setnewQue(false);
    };

    const context = useContext(baseContext);

    const newText = () => {
        var queID = `que${new Date().getTime()}`;
        context.setNewForm(
            context.newForm.concat([<TextBox queID={queID} key={queID} />])
        );
        hide();
    };

    const newCheck = () => {
        var queID = `que${new Date().getTime()}`;
        context.setNewForm(
            context.newForm.concat([<CheckBox queID={queID} key={queID} />])
        );
        hide();
    };

    const newRadio = () => {
        var queID = `que${new Date().getTime()}`;
        context.setNewForm(
            context.newForm.concat([<RadioBox queID={queID} key={queID} />])
        );
        hide();
    };

    if (context.newQue === false) {
        return <></>;
    } else {
        return (
            <div className="typeList" onClick={hide} id="select" style={{top:window.scrollY + "px"}}>
                <div className="queType" onClick={newText}>
                    Text Type
                </div>
                <div className="queType" onClick={newRadio}>
                    Single Selectable
                </div>
                <div className="queType" onClick={newCheck}>
                    Multiple Selectable
                </div>
            </div>
        );
    }
}
