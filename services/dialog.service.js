import Vue from "vue";
import DialogWrapper from "@/dialogs/layout/DialogWrapper.vue";

export default function (dialogComponent, props) {
  return new Promise((resolve, reject) => {
    const Wrapper = Vue.extend(DialogWrapper);
    const dialog = new Wrapper({
      propsData: {
        dialogComponent,
        props,
      },
    }).$mount();
    document.body.appendChild(dialog.$el);
    //document.body.style.overflow = "hidden";

    dialog.$on("update", ({ property, value }) => {
      Vue.set(dialog.resolveData, property, value);
    });

    dialog.$on("close", () => {
      dialog.$destroy();
      dialog.$el.remove();
      //document.body.style.overflow = "visible";
      resolve("close");
    });

    dialog.$on("resolve", (value) => {
      dialog.$destroy();
      dialog.$el.remove();
      //document.body.style.overflow = "visible";
      resolve(value);
    });
  });
}
