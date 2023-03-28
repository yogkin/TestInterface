import { ITestEat } from '../interface/ITestEat';

class TestViewModel implements ITestEat {
  getEat(): void {
    console.log('吃饭啦')
  }

  each(){

  }
}

let loginViewMode = new TestViewModel();

export default loginViewMode as TestViewModel;