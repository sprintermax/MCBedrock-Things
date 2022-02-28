import { world } from "mojang-minecraft";
import { ActionFormData, MessageFormData, ModalFormData } from "mojang-minecraft-ui";

const ExampleForms = {
    TestActF_1: new ActionFormData()
        .title("SF_LongFormTestActF1 Title Text") //Original: .title("SF_VanillaActF1 Title Text")
        .body("ActF1 Body Description")
        .button("ActF1 Button1")
        .button("ActF1 Button2", "textures/items/apple"),
    TestMdlF_1: new ModalFormData()
        .title("SF_VanillaMdlF1 Title Text")
        .icon("textures/items/apple") // ???
        .slider("MdlF1 Slider1", -10, 10, 2, 0)
        .dropdown("MdlF1 Dropdown1", [
            "MdlF1 Dropdown1 Option1",
            "MdlF1 Dropdown1 Option2",
            "MdlF1 Dropdown1 Option3",
            "MdlF1 Dropdown1 Option4"
        ], 0)
        .textField("MdlF1 TextField1", "MdlF1 TextField1 PlaceHolder")
        .toggle("MdlF1 Toggle1", true)
        .toggle("MdlF1 Toggle2", false),
    TestMsgF_1: new MessageFormData()
        .title("MsgF1 Title Text")
        .body("MsgF1 Body Description")
        .button1("MsgF1 Button1")
        .button2("MsgF1 Button2")
}

const CustomFormModal = new ModalFormData()
    .title("SF_VanillaCustom Form Builder")
    .dropdown("Form Type", [
        "Pre Made Example",
        "Custom Action Form",
        "Custom Modal Form"
    ], 0)
    .dropdown("Screen Prefix", [
        "SF_Vanilla",
        "SF_BottomAction",
        "SF_FullScreen"
    ], 0)
    .toggle("Use Custom Screen Prefix", false)
    .textField("Custom Screen Prefix", "SF_MyPrefix")
    .textField("Aditional Data", "btnx10,btn1,btn2,bdy,txtx8,tglx5,sldx4,drpx3,ico")

let UsedItem = false;

world.events.beforeItemUse.subscribe(async EventData => {
    const Item = EventData.item;
    const Player = EventData.source;

    if (UsedItem) return;

    if (Item.id == "minecraft:diamond") {
        UsedItem = true;
        CustomFormModal.show(Player).then(FormRes => {
            UsedItem = false;
            CustomFormBuilder(Player, FormRes);
        });
    } else if (Item.id == "minecraft:stick") {
        UsedItem = true;
        let FormToShow;

        switch (Item.amount) {
            case 1:
                FormToShow = "TestActF_1";
                break;
            case 2:
                FormToShow = "TestMdlF_1";
                break;
            case 3:
                FormToShow = "TestMsgF_1";
                break;
        }

        if (!FormToShow) {
            UsedItem = false;
        } else {
            //console.warn("Showing Form" + FormToShow);
            ExampleForms[FormToShow].show(Player).then(FormRes => {
                UsedItem = false;
            });
        }
    }
});

function CustomFormBuilder(Player, FormRes) {
    if (FormRes.isCanceled) return;
    let FormToShow;
    const FormData = {
        type: FormRes.formValues[0],
        screenprefix: FormRes.formValues[1],
        usecustomprefix: FormRes.formValues[2],
        customprefix: FormRes.formValues[3],
        aditionaldata: FormRes.formValues[4]
    };

    if (FormData.type == 0) {
        if (!FormData.aditionaldata) return console.warn("No Example Form Name Received");
        if (!ExampleForms[FormData.aditionaldata]) return console.warn("Example Form Not Found");
        FormToShow = ExampleForms[FormData.aditionaldata];
        /*if (usecustomprefix) { // WIP
            FormToShow.title(FormData.customprefix)
        } else {
            //FormToShow.title(FormData.screenprefix) //WIP convert custom prefix names
        };
        FormToShow.show(Player);*/

    }

    //Player.runCommand(`say ${JSON.stringify(FormData)}`)
}
