@Entry
@Component
struct TestWindows {
  @State message: string = 'Hello World'

  build() {
    Button('')
      .height('100%')
      .gesture(
      TapGesture()
        .onAction(() => {
          console.log('点击了');
        }))
  }
}