import { moveEvent } from '../entryability/EntryAbility';
import TestViewModel from 'ets/viewmodel/TestViewModel'
import emitter from "@ohos.events.emitter";

@Entry
@Component
struct Index {
  @State message: string = 'Hello World'

  build() {
    Column() {
      Column() {
        Text(this.message)
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
      }
      .width('100%')

      Button('点击我').onClick(() => {
        TestViewModel.getEat()
      })
    }
    .onDragMove((event) => {
      console.log('onDragMove' + JSON.stringify(event));
    })
    .backgroundColor(Color.Gray)
    .onTouch((event) => {
      console.log('onTouch' + JSON.stringify(event));
      emitter.emit(moveEvent, { data: { 'x': event.touches[0].screenX, 'y': event.touches[0].screenY } })
    })
    .height('100%')
  }
}