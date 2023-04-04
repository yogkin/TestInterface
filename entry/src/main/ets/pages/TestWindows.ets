import { moveEvent } from '../entryability/EntryAbility';
import emitter from "@ohos.events.emitter";
@Entry
@Component
struct TestWindows {
  @State message: string = 'Hello World'

  build() {
    Text('')
  }
}