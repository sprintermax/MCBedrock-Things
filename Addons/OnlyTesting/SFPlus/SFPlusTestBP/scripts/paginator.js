import { world as World } from "mojang-minecraft"
import { ActionFormData, MessageFormData, ModalFormData } from "mojang-minecraft-ui"

class Chainer {
    constructor(plr) {
        this.uis = {}
        this.plr = plr
    }

    add(ui, name) {
        this.uis[name] = { ui }
    }

    on(uiName, btnId, value) {
        this.uis[uiName][btnId] = value
    }

    shower(e) {
        console.warn("shower " + this.now + " " + e.selection)
        if (e.isCanceled) return;

        let n = e.selection

        let value = this.uis[this.now][n]

        if (typeof value == "string") {
            this.start(value)
        } else if (typeof value == "function") {
            value(e)
        } else {
            throw new Error("oof")
        }
    }

    start(uiName) {
        console.warn("start " + uiName)
        this.now = uiName
        this.uis[this.now].ui.show(this.plr).then(v => this.shower(v))
    }

}


const a1 = new ActionFormData()
    .title("first 1111111111111111111111111111111111111111111111111111111111111111111111111")
    .body("first")
    .button("next") // 0
    .button("last") // 1

const a2 = new ActionFormData()
    .title("2nd")
    .body("2nd")
    .button("back") // 0
    .button("next") // 1
    .button("tell") // 2

const a3 = new ActionFormData()
    .title("3rd")
    .body("3rd")
    .button("back") // 0
    .button("root") // 1


const chatCallback = World.events.beforeChat.subscribe((eventData) => {
    if (eventData.message.includes("test")) {
        // Cancel event if the message contains "cancel"
        eventData.canceled = true;

    } else {
        // Modify chat message being sent
        eventData.message = `Modified '${eventData.message}'`;
    }
});

World.events.blockPlace.subscribe(eventData => {
    const { block, player } = eventData

    let ch = new Chainer(player)

    ch.add(a1, "a")
    ch.add(a2, "b")
    ch.add(a3, "c")

    ch.on("a", 0, "b")
    ch.on("a", 1, "c")

    ch.on("b", 0, "a")
    ch.on("b", 1, "c")
    ch.on("b", 2, () => console.warn(JSON.stringify(ch)))

    ch.on("c", 0, "b")
    ch.on("c", 1, "a")

    ch.start("a")

})
