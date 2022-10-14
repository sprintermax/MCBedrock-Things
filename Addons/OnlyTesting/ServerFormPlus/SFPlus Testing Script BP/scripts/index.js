import { world } from "@minecraft/server";
import { ModalFormData, ActionFormData, MessageFormData } from "@minecraft/server-ui";

const vanillaLongForm = new ActionFormData()
    .body("Vanilla Long Form Description")
    .button("Long Form Button 1")
    .button("Long Form Button 2", "textures/items/apple")
    .button("Long Form Button 3", "textures/items/diamond");

const vanillaModalForm = new ModalFormData()
    .slider("Modal Form Slider 1", -10, 10, 2, 0)
    .dropdown("Modal Form Dropdown 1", [
        "Modal Form Dropdown Option 1",
        "Modal Form Dropdown Option 2",
        "Modal Form Dropdown Option 3",
        "Modal Form Dropdown Option 4",
        "Modal Form Dropdown Option 5"
    ], 0)
    .textField("Modal Form Text Field 1", "Modal Form Text Field 1 PlaceHolder")
    .toggle("Modal Form Toggle 1", true)
    .toggle("Modal Form Toggle 2", false);

const vanillaMessageForm = new MessageFormData()
    .body("Vanilla Message Form Description")
    .button1("Message Form Button 1")
    .button2("Message Form Button 2");

const customStringForm = new ModalFormData()
    .title("Open custom form")
    .dropdown("Custom Form Type", [
        "Long Form",
        "Modal Form",
        "Message Form"
    ], 0)
    .textField("Custom Screen Title", "_sf+:MyPrefix My Title")

const customLongFormTest = new ActionFormData()
    .body("Custom Long Form Description\n--> Here is some dummy lines:\n\nLine 1\nLine 2\nLine 3\nLine 4\nLine 5\nLine 6\nLine 7\nLine 8\nLine 9\nLine 10\nLine 11\nLine 12\nLine 13\nLine 14\nLine 15\nLine 16\nLine 17\nLine 18\nLine 19\nLine 20\nLine 21\nLine 22\nLine 23\nLine 24\nLast Line :P")
    .button("Custom Long Form Button 1", "textures/items/apple")
    .button("Custom Long Form Button 2", "textures/items/diamond")
    .button("Custom Long Form Button 3");

const customModalFormTest = new ModalFormData()
    .slider("Custom Modal Form Slider 1", -10, 10, 2, 0)
    .dropdown("Custom Modal Form Dropdown 1", [
        "Custom Modal Form Dropdown Option 1",
        "Custom Modal Form Dropdown Option 2",
        "Custom Modal Form Dropdown Option 3",
        "Custom Modal Form Dropdown Option 4",
        "Custom Modal Form Dropdown Option 5"
    ], 0)
    .textField("Custom Modal Form Text Field 1", "Custom Modal Form Text Field 1 PlaceHolder")
    .toggle("Custom Modal Form Toggle 1", true)
    .toggle("Custom Modal Form Toggle 2", false);

world.events.itemUse.subscribe(async ({ item, source }) => {

    if (item.typeId === 'minecraft:stick') vanillaLongForm.title("Vanilla Long Form Title").show(source);
    if (item.typeId === 'minecraft:emerald') vanillaModalForm.title("Vanilla Modal Form Title").show(source);
    if (item.typeId === 'minecraft:diamond') vanillaMessageForm.title("Vanilla Message Form Title").show(source);

    if (item.typeId === 'minecraft:blaze_rod') customLongFormTest.title("Custom Long Form Title").show(source);
    if (item.typeId === 'minecraft:bone') customModalFormTest.title("Custom Modal Form Title").show(source);

    if (item.typeId === 'minecraft:gold_ingot') {
        const customFormRes = await customStringForm.show(source);
        if (customFormRes.canceled) return;
        const customForm = customFormRes.formValues[0] === 0 ? customLongFormTest : customFormRes.formValues[0] === 1 ? customModalFormTest : vanillaMessageForm;
        customForm.title(customFormRes.formValues[1] || '_sf+:MyPrefix Title Message');
        customForm.show(source);
    };
});

world.events.worldInitialize.subscribe(() => {
    console.warn('§e[Server Form+ Testing Script Running]§r - Usage: \n -> Stick = Vanilla Long Form\n -> Emerald = Vanilla Custom Form\n -> Diamond = Vanilla Message Form\n -> Blaze Rod = Custom Long Form Test\n -> Bone = Custom Modal Form Test\n -> Gold Ingot = Open Form with Custom Prefix');
});
