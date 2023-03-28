import TestViewModel from 'ets/viewmodel/TestViewModel'


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
    .height('100%')
  }
}