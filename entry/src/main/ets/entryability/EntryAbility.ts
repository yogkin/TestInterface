import window from '@ohos.window';
import Configuration from '@ohos.app.ability.Configuration';
import UIAbility from '@ohos.app.ability.UIAbility';
import hilog from '@ohos.hilog';
import emitter from "@ohos.events.emitter";

let windowStage_:window.WindowStage = null;
let sub_windowClass:window.Window = null;

// 定义一个eventId为1的事件
export let moveEvent = {
    eventId: 1
};

// 收到eventId为1的事件后执行该回调
let callback = (eventData) => {
    console.info('event callback'+JSON.stringify(eventData));
    // 2.子窗口创建成功后，设置子窗口的位置、大小及相关属性等。
    // @ts-ignore
    sub_windowClass?.moveWindowTo(vp2px(eventData.data.x)-50, vp2px(eventData.data.y)+50, (err) => {
        if (err.code) {
            console.error('Failed to move the window. Cause:' + JSON.stringify(err));
            return;
        }
        console.info('Succeeded in moving the window.');
    });
};

export default class EntryAbility extends UIAbility {

    onCreate(want, launchParam) {
        hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onCreate');
    }

    onDestroy() {
        hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onDestroy');
    }


    onForeground() {
        // Ability has brought to foreground
        hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onForeground');
    }

    onBackground() {
        // Ability has back to background
        hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onBackground');
    }

    showSubWindow() {
        // 1.创建应用子窗口。
        windowStage_.createSubWindow("mySubWindow", (err, data) => {
            if (err.code) {
                console.error('Failed to create the subwindow. Cause: ' + JSON.stringify(err));
                return;
            }
            sub_windowClass = data;
            console.info('Succeeded in creating the subwindow. Data: ' + JSON.stringify(data));
            // 2.子窗口创建成功后，设置子窗口的位置、大小及相关属性等。
//            sub_windowClass.moveWindowTo(300, 300, (err) => {
//                if (err.code) {
//                    console.error('Failed to move the window. Cause:' + JSON.stringify(err));
//                    return;
//                }
//                console.info('Succeeded in moving the window.');
//            });
            sub_windowClass.resize(100,100, (err) => {
                if (err.code) {
                    console.error('Failed to change the window size. Cause:' + JSON.stringify(err));
                    return;
                }
                console.info('Succeeded in changing the window size.');
            });
            // 3.为子窗口加载对应的目标页面。
            sub_windowClass.setUIContent("pages/TestWindows", (err) => {
                if (err.code) {
                    console.error('Failed to load the content. Cause:' + JSON.stringify(err));
                    return;
                }
                console.info('Succeeded in loading the content.');
                // 3.显示子窗口。
                sub_windowClass.showWindow((err) => {
                    if (err.code) {
                        console.error('Failed to show the window. Cause: ' + JSON.stringify(err));
                        return;
                    }
                    console.info('Succeeded in showing the window.');
                });
            });
            sub_windowClass.setWindowTouchable(false)
        })
    }

    destroySubWindow() {
        // 4.销毁子窗口。当不再需要子窗口时，可根据具体实现逻辑，使用destroy对其进行销毁。
        sub_windowClass.destroyWindow((err) => {
            if (err.code) {
                console.error('Failed to destroy the window. Cause: ' + JSON.stringify(err));
                return;
            }
            console.info('Succeeded in destroying the window.');
        });
    }

    onWindowStageCreate(windowStage:window.WindowStage) {
        windowStage_ = windowStage;
        // 开发者可以在适当的时机，如主窗口上按钮点击事件等，创建子窗口。并不一定需要在onWindowStageCreate调用，这里仅作展示
        this.showSubWindow();
        // 订阅eventId为1的事件
        emitter.on(moveEvent, callback);
        windowStage.loadContent('pages/Index', (err, data) => {
            if (err.code) {
                hilog.error(0x0000, 'testTag', 'Failed to load the content. Cause: %{public}s', JSON.stringify(err) ?? '');
                return;
            }
            hilog.info(0x0000, 'testTag', 'Succeeded in loading the content. Data: %{public}s', JSON.stringify(data) ?? '');
        });
    }

    onWindowStageDestroy() {
        // 开发者可以在适当的时机，如子窗口上点击关闭按钮等，销毁子窗口。并不一定需要在onWindowStageDestroy调用，这里仅作展示
        this.destroySubWindow();
    }
}
