import { Injectable } from '@nestjs/common';
import { CategoryRepository } from './category/repository/category.repository';
import { QuestionRepository } from './question/repository/question.repository';
import { AnswerRepository } from './answer/repository/answer.repository';

const feQuestions = [
  '브라우저 렌더링 과정에 대해서 설명해주세요\n',
  'CSS 선택자의 종류에 대해 설명해주세요.\n',
  'JavaScript의 클로저(Closure)에 대해 설명해주세요.\n',
  'HTML과 XHTML의 차이점은 무엇인가요?\n',
  'React에 대해서 아는 만큼 설명해주세요\n',
  '서버사이드 렌더링에 대해서 아는 만큼 설명해주세요\n',
  '클라이언트 사이드 렌더링에 대해서 아는 만큼 설명해주세요\n',
  '공용 컴포넌트를 개발할때 주의할 점에 대해서 설명해주세요',
].map((each) => each.replace('\n', ''));

const feAnswers = [
  `브라우저의 렌더링 과정에 대해 설명드리겠습니다. 브라우저 렌더링 과정은 웹 페이지가 브라우저에 로드되고 사용자에게 표시되기까지의 일련의 단계를 말합니다. 이 과정은 매우 복잡하지만, 기본적으로는 몇 가지 주요 단계로 나눌 수 있습니다첫 번째 단계는 문서 파싱입니다. 브라우저는 HTML 문서를 받아서 DOM(Document Object Model) 트리를 생성합니다. 이 단계에서는 HTML 문서의 태그를 읽어서 각 태그에 해당하는 DOM 노드를 만듭니다. 이렇게 생성된 DOM 트리는 웹 페이지의 구조를 나타냅니다.동시에, CSS 파싱이 진행됩니다. 브라우저는 모든 CSS 파일과 <style> 태그를 읽어 CSSOM(CSS Object Model) 트리를 구축합니다. CSSOM 트리는 DOM 트리의 각 노드에 적용될 스타일을 정의합니다.DOM 트리와 CSSOM 트리가 완성되면, 브라우저는 이 두 트리를 결합하여 렌더 트리를 생성합니다. 렌더 트리는 화면에 실제로 표시되는 요소들만을 포함하고, 시각적 속성(색상, 차원 등)을 담고 있습니다.다음 단계는 레이아웃 또는 리플로우 과정입니다. 이 단계에서는 렌더 트리의 각 노드에 대한 정확한 위치와 크기를 계산합니다. 페이지의 각 요소가 화면의 어느 위치에 표시될지 결정하는 과정이죠.레이아웃이 완료되면 페인팅 과정이 이어집니다. 페인팅은 렌더 트리의 노드들을 실제 화면에 그리는 과정입니다. 이 단계에서는 텍스트 색상, 이미지, 보더 등이 화면에 표시됩니다.마지막으로, 컴포지팅 단계에서는 여러 레이어를 합쳐 최종적으로 사용자에게 보여질 페이지를 완성합니다. 여러 요소가 서로 겹치는 경우, 이 단계에서 최종적인 스택 순서가 결정됩니다.브라우저 렌더링 과정은 매우 빠르게 진행되며, 사용자의 상호작용(예: 스크롤, 클릭)이나 DOM 변경에 따라 지속적으로 반복됩니다. 최적화된 웹 사이트는 이 렌더링 과정에서 더 빠른 성능을 보여주며, 이는 사용자 경험에 직접적인 영향을 미칩니다.`,
  `CSS 선택자에 대해 설명드리겠습니다. CSS 선택자는 웹 페이지에서 특정 요소를 스타일링하기 위해 사용되는 중요한 도구입니다. 다양한 유형의 선택자가 있으며, 각각의 사용 사례에 대해 설명드리겠습니다. 먼저 기본 선택자에는 태그, 클래스, 아이디 선택자가 있습니다. 태그 선택자는 HTML 태그 이름을 사용해 해당 태그를 가진 모든 요소를 선택합니다. 예를 들어, 'p' 선택자는 모든 <p> 요소를 선택합니다. 클래스 선택자는 점(.)으로 시작하며, 특정 클래스를 가진 모든 요소를 선택합니다. 예를 들어, '.className'은 'className' 클래스를 가진 모든 요소를 선택합니다. 아이디 선택자는 해시(#)로 시작하며, 고유한 아이디를 가진 단일 요소를 선택합니다. 예를 들어, '#uniqueId'는 'uniqueId' 아이디를 가진 요소를 선택합니다. 다음은 복합 선택자입니다. 자손 선택자는 두 요소 사이에 공백을 사용하여, 한 요소의 자손을 선택합니다. 예를 들어, 'div p'는 div 안의 모든 p 요소를 선택합니다. 자식 선택자는 '>' 기호를 사용하여, 특정 요소의 직접적인 자식만을 선택합니다. 예를 들어, 'ul > li'는 ul의 직접적인 li 자식들만을 선택합니다. 인접 형제 선택자 '+'는 특정 요소 바로 뒤에 오는 형제 요소를 선택하고, 일반 형제 선택자 '~'는 특정 요소 뒤에 오는 모든 형제 요소를 선택합니다. 속성 선택자는 요소의 특정 속성을 기반으로 요소를 선택합니다. 예를 들어, '[type="text"]'는 type 속성이 'text'인 모든 요소를 선택합니다. 이 선택자는 특정 속성의 존재 여부, 속성 값의 부분 일치 등 다양한 방식으로 사용될 수 있습니다. 마지막으로, 가상 클래스와 가상 요소 선택자입니다. 가상 클래스 선택자는 요소의 특정 상태를 기반으로 스타일을 적용합니다. 예를 들어, ':hover'는 사용자가 마우스를 요소 위에 올렸을 때의 스타일을 정의합니다. 가상 요소 선택자는 요소의 특정 부분을 스타일링합니다. 예를 들어, '::before'와 '::after'는 요소의 내용 전후에 콘텐츠를 추가할 때 사용됩니다. 이처럼 CSS 선택자는 웹 페이지의 다양한 요소를 효과적으로 타깃팅하고 스타일링하는 데 필수적입니다. 각 선택자는 특정 상황과 요구 사항에 맞게 사용될 수 있으며, 웹 디자인의 유연성과 효율성을 크게 향상시킵니다. 감사합니다.'`,
  `JavaScript의 중요한 개념 중 하나인 클로저에 대해 설명드리겠습니다. 클로저는 함수와 그 함수가 선언된 어휘적 환경의 조합으로, 외부 함수에서 선언된 변수에 접근할 수 있는 내부 함수를 말합니다. 클로저는 JavaScript에서 함수가 선언될 때 그 함수가 자신의 스코프 밖의 변수에 접근할 수 있게 해주는 속성입니다. 이는 JavaScript가 어휘적 스코핑을 사용하기 때문인데, 즉 함수는 자신이 선언된 시점에서의 스코프의 변수에 접근할 수 있습니다. 예를 들어, 외부 함수가 내부 함수를 반환하고, 이 내부 함수가 외부 함수의 변수에 접근할 경우, 이 내부 함수를 클로저라고 합니다. 클로저의 한 가지 실용적인 예시는 데이터 캡슐화입니다. 클로저를 사용하면 특정 함수에 대한 상태를 저장하고 관리할 수 있습니다. 예를 들어, 외부에서 접근할 수 없는 변수를 포함하는 함수를 생성하고, 이 변수에 접근하거나 수정할 수 있는 메소드를 제공하는 내부 함수를 반환할 수 있습니다. 이렇게 하면 객체 지향 프로그래밍의 일부 개념을 함수형 프로그래밍에서도 구현할 수 있습니다. 클로저의 장점 중 하나는 상태를 안전하게 숨길 수 있다는 것입니다. 이는 모듈 패턴에서 매우 유용하며, 공개 API를 통해 특정 함수의 기능만 노출시킬 수 있습니다. 하지만 클로저를 사용할 때는 메모리 관리에 주의해야 합니다. 클로저가 외부 스코프의 변수를 참조하고 있으면, 해당 변수는 가비지 컬렉션 대상이 되지 않아 메모리 누수가 발생할 수 있습니다. 결론적으로, 클로저는 JavaScript에서 매우 강력한 도구입니다. 이를 통해 더욱 풍부한 함수 기능을 구현할 수 있으며, 모듈 패턴 등 다양한 패턴을 구현하는 데에도 중요한 역할을 합니다. 클로저의 이해는 JavaScript의 깊은 이해로 이어지며, 효과적인 코드 작성에 필수적입니다. 감사합니다.`,
  `HTML과 XHTML의 차이점에 대해 말씀드리겠습니다. 먼저, HTML, 즉 HyperText Markup Language는 웹 페이지를 만들기 위한 표준 마크업 언어입니다. 웹의 기본 구성 요소로, 웹 콘텐츠의 구조를 정의하고 하이퍼텍스트를 통한 링크 기능을 제공합니다. HTML은 상대적으로 유연한 문법을 가지고 있어, 태그의 대소문자 구분이 없고, 일부 태그는 닫히지 않아도 문제가 없습니다.반면, XHTML, 즉 eXtensible HyperText Markup Language는 HTML을 XML의 엄격한 문법에 맞게 재정의한 것입니다. XHTML은 HTML 4.01을 기반으로 하지만, XML의 규칙을 따르기 때문에 더 엄격한 문법 규칙을 가집니다. 예를 들어, 모든 태그는 반드시 닫혀야 하며, 소문자로 작성되어야 합니다. 또한, 모든 속성 값은 따옴표로 묶여야 하며, 문서는 반드시 well-formed해야 합니다.HTML과 XHTML의 주요 차이점 중 하나는 문서의 오류 처리 방식입니다. HTML은 오류가 있어도 브라우저가 이를 해석하고 표시할 수 있는 반면, XHTML은 XML 기반이므로 오류가 있으면 문서 전체가 제대로 표시되지 않을 수 있습니다. 이는 XHTML이 더 엄격한 표준 준수를 요구한다는 것을 의미합니다.또한, XHTML은 XML의 확장성과 다양성을 활용할 수 있다는 장점이 있습니다. 예를 들어, XHTML 문서는 다른 XML 기반 언어와 함께 사용될 수 있어, 데이터의 통합과 처리가 용이합니다. 반면, HTML은 웹 페이지의 구조와 콘텐츠 표현에 집중하고 있습니다.종합하자면, HTML과 XHTML은 기본적인 목적은 동일하지만, XHTML은 XML의 엄격한 문법을 따르는 것이 가장 큰 차이점입니다. 이러한 차이는 개발자가 웹 페이지를 구축할 때 고려해야 할 중요한 요소가 됩니다. 오늘날 대부분의 웹 개발은 HTML5를 사용하지만, XHTML을 사용하는 경우도 여전히 있으며, 이는 특정 프로젝트의 요구사항이나 개발 환경에 따라 결정됩니다.`,
  `React에 대해 설명드리겠습니다. React는 사용자 인터페이스를 구축하기 위한 선언적, 효율적, 유연한 JavaScript 라이브러리입니다. Facebook에서 개발하고 관리하며, 주로 웹 애플리케이션의 프론트엔드 개발에 사용됩니다.React의 핵심 개념 중 하나는 컴포넌트 기반 아키텍처입니다. 웹 애플리케이션을 독립적이고 재사용 가능한 작은 부분, 즉 '컴포넌트'로 나누어 구성합니다. 각 컴포넌트는 자신만의 상태(state)와 생명주기(lifecycle)를 가지며, 사용자 인터페이스를 구성하는 데 필요한 데이터와 로직을 포함합니다. 이러한 방식은 애플리케이션의 코드를 관리하고 유지하기 쉽게 만들어 줍니다.React의 또 다른 중요한 특징은 가상 DOM(Virtual DOM)입니다. 전통적인 웹 개발 방식에서 DOM 조작은 성능 저하의 주요 원인 중 하나였습니다. React는 이 문제를 가상 DOM을 통해 해결합니다. 컴포넌트의 상태가 변경될 때마다, React는 가상 DOM을 사용하여 브라우저의 실제 DOM과 동기화하는 최적의 방법을 계산합니다. 이는 애플리케이션의 성능을 크게 향상시킵니다.React는 JSX라는 문법을 사용하여 컴포넌트의 구조를 선언합니다. JSX는 JavaScript와 HTML을 결합한 것으로 보이는 문법으로, 개발자가 UI 구조를 더 직관적으로 작성할 수 있게 해줍니다. 이를 통해 개발자는 컴포넌트의 렌더링 로직을 효율적으로 작성하고 관리할 수 있습니다.또한, React는 단방향 데이터 흐름(one-way data flow)을 강조합니다. 데이터는 상위 컴포넌트에서 하위 컴포넌트로만 흐르며, 이는 애플리케이션 상태 관리를 더욱 명확하고 예측 가능하게 만듭니다.React는 다양한 에코시스템과 함께 사용됩니다. 예를 들어, 상태 관리를 위해 Redux나 Context API가 사용되며, 라우팅을 위해서는 React Router가 사용됩니다. 또한, 서버 사이드 렌더링을 위해 Next.js 같은 프레임워크와 결합될 수 있습니다.마지막으로, React의 인기는 그 유연성과 확장성, 커뮤니티의 지원 덕분에 계속 증가하고 있습니다. 이는 개발자가 빠르게 변화하는 웹 개발 환경에 능동적으로 대응할 수 있게 해주며, 다양한 규모와 요구사항을 가진 프로젝트에 적용될 수 있습니다.`,
  `서버 사이드 렌더링, 즉 SSR에 대해 설명드리겠습니다. 서버 사이드 렌더링은 웹 페이지의 초기 로딩 시점에 필요한 HTML을 서버에서 미리 생성하여 클라이언트에 전송하는 방식입니다. 이는 클라이언트 사이드 렌더링(CSR)과 대비되는 개념으로, 웹 애플리케이션의 성능과 사용자 경험을 개선하는 데 중요한 역할을 합니다.SSR의 핵심은 사용자가 요청한 웹 페이지에 필요한 모든 데이터와 HTML 마크업을 서버에서 처리하고, 이를 클라이언트로 전송한다는 점입니다. 이 과정에서 서버는 데이터베이스 조회, API 호출 등을 수행하여 필요한 데이터를 가져오고, 이를 바탕으로 완성된 HTML 페이지를 생성합니다. 그런 다음 이 HTML을 사용자의 브라우저로 전송하게 되며, 브라우저는 이를 받아서 바로 렌더링할 수 있습니다.SSR의 주요 장점 중 하나는 빠른 초기 로딩 시간입니다. 사용자는 서버에서 렌더링된 페이지를 받기 때문에, 초기 콘텐츠를 더 빨리 볼 수 있습니다. 이는 특히 네트워크 속도가 느린 환경에서 큰 이점을 제공합니다.또 다른 장점은 검색 엔진 최적화(SEO)입니다. 서버에서 렌더링된 페이지는 검색 엔진에 의해 더 잘 인덱싱될 수 있습니다. 이는 HTML이 이미 생성되어 있기 때문에 검색 엔진이 콘텐츠를 더 쉽게 크롤링하고 이해할 수 있기 때문입니다.하지만 SSR에는 몇 가지 고려해야 할 단점도 있습니다. 서버에 부하가 많이 가해질 수 있으며, 사용자의 요청에 대한 응답 시간이 길어질 수 있습니다. 또한, 클라이언트와 서버 간의 지속적인 데이터 동기화가 필요할 수 있으며, 이는 복잡성을 증가시킬 수 있습니다.현대 웹 개발에서 SSR은 React, Angular, Vue.js와 같은 프론트엔드 프레임워크와 함께 사용됩니다. 예를 들어, Next.js는 React 애플리케이션에 대한 서버 사이드 렌더링을 쉽게 구현할 수 있는 프레임워크입니다. 이를 통해 개발자는 SSR의 이점을 활용하면서도, 클라이언트 사이드의 인터랙티브한 기능을 유지할 수 있습니다.`,
  `안녕하세요, 오늘은 클라이언트 사이드 렌더링, 즉 CSR에 대해 설명드리겠습니다. 클라이언트 사이드 렌더링은 웹 애플리케이션의 콘텐츠가 사용자의 브라우저에서 동적으로 생성되는 과정을 말합니다. 이는 전통적인 서버 사이드 렌더링과 대비되는 개념으로, 최근의 웹 개발 트렌드 중 하나입니다.CSR에서는 초기에 서버로부터 받는 HTML 문서가 매우 간단합니다. 대부분의 경우, 이 HTML 문서는 애플리케이션을 실행하는데 필요한 JavaScript 파일 링크만을 포함합니다. 사용자의 브라우저가 이 HTML 문서를 로드한 후, JavaScript가 실행되며 애플리케이션의 나머지 부분이 브라우저에서 동적으로 생성됩니다.이 과정에서 JavaScript는 서버로부터 필요한 데이터를 비동기적으로 요청하고, 이를 바탕으로 사용자 인터페이스를 구성합니다. 이는 AJAX(Asynchronous JavaScript and XML) 요청을 통해 이루어집니다. 데이터가 로드되면, JavaScript는 이를 사용하여 동적으로 HTML을 생성하고 페이지에 삽입합니다.CSR의 가장 큰 장점은 풍부한 사용자 경험과 빠른 인터랙티브성을 제공한다는 것입니다. 한 번의 페이지 로드로 필요한 모든 자원을 가져오고, 이후에는 데이터만 변경하면 되기 때문에 사용자와의 상호작용이 매우 부드럽고 빠릅니다.또한, 서버의 부담을 줄일 수 있습니다. 서버는 초기 요청에만 HTML을 제공하고, 이후의 동적인 부분은 클라이언트가 처리하기 때문에 서버의 부하가 감소합니다.하지만 CSR에도 단점이 있습니다. 초기 로딩 시간이 길어질 수 있으며, 이는 특히 대규모 JavaScript 파일을 로드해야 할 경우 더욱 두드러집니다. 또한, 검색 엔진 최적화(SEO)에 어려움이 있을 수 있습니다. 서버에서 완전한 HTML을 제공하지 않기 때문에 검색 엔진이 페이지의 내용을 제대로 크롤링하지 못할 수 있습니다.React, Angular, Vue.js와 같은 현대적인 프론트엔드 프레임워크와 라이브러리는 주로 CSR 방식을 사용합니다. 이를 통해 개발자들은 더욱 동적이고 인터랙티브한 웹 애플리케이션을 구축할 수 있습니다.`,
  `공용 컴포넌트를 개발할 때는 여러 가지 중요한 측면을 고려해야 합니다. 공용 컴포넌트는 다양한 곳에서 재사용될 수 있으므로, 범용성, 유지보수 용이성, 성능 등 여러 면에서 효율적이어야 합니다.첫째, 범용성과 유연성을 확보해야 합니다. 공용 컴포넌트는 다양한 사용 사례와 환경에서 사용될 수 있으므로, 범용적이고 확장 가능한 설계가 중요합니다. 이를 위해, 컴포넌트의 인터페이스는 간결하면서도 충분히 유연해야 하며, 다양한 상황에서도 잘 작동할 수 있도록 설계해야 합니다.둘째, 명확한 API 문서화가 필요합니다. 공용 컴포넌트를 사용하는 다른 개발자들이 쉽게 이해하고 사용할 수 있도록, 모든 속성과 메서드, 이벤트 핸들러 등에 대한 자세한 문서를 제공해야 합니다. 이는 컴포넌트의 사용 방법과 예상되는 동작을 명확하게 전달하는 역할을 합니다.셋째, 견고한 에러 핸들링이 중요합니다. 공용 컴포넌트는 예상치 못한 상황이나 오류를 적절히 처리할 수 있어야 합니다. 이는 컴포넌트가 안정적으로 동작하고, 오류 발생 시 적절한 피드백을 제공할 수 있도록 하는 데 필요합니다.넷째, 성능 최적화를 고려해야 합니다. 공용 컴포넌트는 성능에 큰 영향을 미칠 수 있으므로, 불필요한 렌더링을 피하고, 메모리 사용을 최적화하는 등 성능에 대한 고려가 필요합니다.다섯째, 스타일링의 유연성을 제공해야 합니다. 다양한 프로젝트에서 사용될 수 있도록 컴포넌트의 스타일링은 쉽게 커스터마이징할 수 있어야 합니다. 이를 위해 CSS 클래스와 인라인 스타일, 테마 지원 등 다양한 스타일링 옵션을 제공하는 것이 좋습니다.마지막으로, 테스트의 용이성을 보장해야 합니다. 공용 컴포넌트는 다양한 환경에서 오류 없이 작동해야 하므로, 단위 테스트, 통합 테스트 등을 통해 충분히 검증되어야 합니다. 테스트를 통해 컴포넌트의 안정성을 보장하고, 유지보수를 용이하게 할 수 있습니다.`,
].map((each) => each.replace('\n', ''));

const beQuestions = [
  'RESTful API란 무엇이며, 왜 중요한가요?\n',
  '데이터베이스 트랜잭션이란 무엇이며, ACID 원칙에 대해 설명해주세요.\n',
  'ORM이란 무엇이고, 어떤 장단점이 있나요?\n',
  '마이크로서비스 아키텍처란 무엇이며, 그 장단점은 무엇인가요?\n',
  'Node.js에서 이벤트 루프란 무엇이며, 어떻게 작동하나요?\n',
  '컨테이너화가 중요한 이유는 무엇이며, Docker는 이 과정에서 어떻게 사용되나요?\n',
  'SQL과 NoSQL 데이터베이스의 차이점은 무엇인가요?',
].map((each) => each.replace('\n', ''));

const beAnswers = [
  `RESTful API는 Representational State Transfer 원칙을 따르는 웹 서비스 인터페이스입니다. 이는 클라이언트와 서버 간의 통신을 단순화하고, 웹의 기능을 최대한 활용하여 효율적인 통신을 가능하게 합니다. RESTful API는 플랫폼 독립적이고, 확장 가능한 애플리케이션을 구축할 수 있도록 해, 다양한 클라이언트와의 호환성을 제공합니다.`,
  `데이터베이스 트랜잭션은 데이터베이스의 상태를 변화시키는 작업의 단위로, 여러 작업들이 하나의 논리적 단위로 묶여 있습니다. 트랜잭션은 ACID(Atomicity, Consistency, Isolation, Durability) 원칙을 준수해야 합니다. 'Atomicity'는 트랜잭션 내의 모든 작업이 완전히 실행되거나 전혀 실행되지 않는 것을 의미합니다. 'Consistency'는 트랜잭션 실행이 완료된 후에도 데이터베이스가 일관된 상태를 유지해야 함을 나타냅니다. 'Isolation'은 여러 트랜잭션이 동시에 실행될 때, 각 트랜잭션은 독립적으로 실행되어야 함을 의미합니다. 마지막으로 'Durability'는 트랜잭션이 성공적으로 완료되면, 그 결과가 영구적으로 저장되어야 함을 의미합니다. 이 원칙들은 데이터베이스 시스템에서 안정성과 신뢰성을 보장하는 데 핵심적인 역할을 합니다.`,
  `ORM(Object-Relational Mapping)은 객체 지향 프로그래밍 언어를 사용하여 호환되지 않는 유형의 시스템 간에 데이터를 변환하는 프로그래밍 기술입니다. ORM의 주요 장점은 개발자가 객체 지향 언어를 사용하여 데이터베이스와 상호작용할 수 있도록 하여, 데이터베이스 프로그래밍을 보다 직관적이고 효율적으로 만든다는 것입니다. 또한, 데이터베이스 설계가 변경되어도 애플리케이션 코드를 크게 수정하지 않고도 대응할 수 있습니다. 하지만, ORM은 복잡한 쿼리를 처리하는 데 있어 SQL에 비해 성능이 떨어질 수 있으며, ORM 자체의 학습 곡선이 존재합니다. 또한, ORM을 사용함으로써 발생할 수 있는 성능 저하 문제를 이해하고 최적화하는 데는 추가적인 노력이 필요합니다.`,
  `마이크로서비스 아키텍처는 애플리케이션을 작고 독립적으로 배포 가능한 여러 서비스로 분할하는 설계 방식입니다. 각 마이크로서비스는 특정 비즈니스 기능을 담당하며, 독립적으로 개발, 배포, 운영됩니다. 이 아키텍처의 주요 장점은 각 서비스가 독립적이기 때문에 서비스를 빠르게 개발하고 배포할 수 있다는 것과, 서비스 간의 강한 응집성과 약한 결합성을 통해 전체 시스템의 유연성을 증가시킨다는 점입니다. 또한, 다양한 기술 스택을 자유롭게 선택할 수 있습니다. 단점으로는 서비스 간 통신 복잡성이 증가하고, 트랜잭션 관리와 데이터 일관성 유지가 어려워질 수 있습니다. 또한, 전체 시스템을 모니터링하고 관리하는 것이 복잡해질 수 있습니다.`,
  `Node.js의 이벤트 루프는 비동기 작업을 관리하는 중심적인 메커니즘입니다. 이벤트 루프는 Node.js가 싱글 스레드임에도 불구하고 고성능을 유지할 수 있게 하는 핵심 요소입니다. 이벤트 루프는 태스크 큐에 쌓인 작업들을 순차적으로 처리합니다. 이 작업들은 주로 네트워크 요청, 파일 I/O 작업 등의 비동기 콜백 함수입니다. 이벤트 루프는 현재 실행 중인 태스크가 완료되면 큐에서 다음 태스크를 가져와 실행합니다. 이 과정은 Node.js 애플리케이션이 종료될 때까지 계속 반복됩니다. 이벤트 루프 덕분에 Node.js는 높은 동시성을 처리할 수 있으며, I/O 바운드 작업에 효율적입니다.`,
  `컨테이너화는 애플리케이션과 그 종속성을 컨테이너라는 격리된 환경에 패키징하는 프로세스입니다. 이 방식의 중요성은 여러 가지 측면에서 나타납니다. 첫째, 컨테이너화를 통해 애플리케이션은 다양한 환경에서 일관되게 실행될 수 있습니다. 이는 개발, 테스트, 프로덕션 환경 간의 '동작한다면 여기서도 동작해야 한다(It works on my machine)' 문제를 해결해 줍니다. 둘째, 컨테이너는 가벼우며 빠르게 시작되어, 높은 확장성과 효율성을 제공합니다. 셋째, 컨테이너화는 애플리케이션의 배포, 관리, 이동성을 간소화하고, 지속적인 통합 및 배포(CI/CD) 파이프라인에 쉽게 통합될 수 있습니다.Docker는 이 컨테이너화 과정에서 핵심적인 역할을 합니다. Docker는 애플리케이션과 그 환경을 컨테이너로 캡슐화하고, 어느 환경에서나 동일하게 실행할 수 있도록 만드는 도구입니다. Docker는 'Dockerfile'이라는 구성 파일을 사용하여 애플리케이션의 빌드 및 실행 환경을 정의합니다. 이 파일에는 애플리케이션의 실행에 필요한 모든 명령어와 설정이 포함되어 있어, 일관된 환경을 쉽게 재현할 수 있습니다.Docker는 컨테이너 이미지를 통해 애플리케이션을 패키징합니다. 이 이미지는 애플리케이션 실행에 필요한 코드, 라이브러리, 환경 변수, 설정 파일 등을 포함하고 있어, 어느 머신에서나 동일하게 애플리케이션을 실행할 수 있게 해줍니다. Docker 컨테이너는 가볍고 빠르게 시작되며, 호스트 OS의 커널을 공유하면서도 프로세스와 파일 시스템을 완벽하게 격리합니다.결론적으로, 컨테이너화는 애플리케이션의 배포와 운영을 간소화하고 표준화하는 데 크게 기여하며, Docker는 이 과정을 가능하게 하는 중요한 도구입니다. Docker를 사용하면 개발자는 애플리케이션을 더 빠르고 일관되게 배포하고 관리할 수 있으며, 이는 최종적으로 생산성 향상과 인프라 비용 절감으로 이어집니다.`,
  `SQL(Structured Query Language)과 NoSQL(Not Only SQL) 데이터베이스는 데이터를 저장하고 관리하는 데 사용되는 두 가지 주요한 기술입니다. 이들의 차이점은 데이터 모델, 확장성, 유연성, 쿼리 언어 및 일관성 모델 등 여러 측면에서 나타납니다.SQL 데이터베이스는 관계형 데이터베이스 시스템(RDBMS)으로, 엄격한 스키마와 테이블 기반 구조를 가지고 있습니다. 데이터는 테이블에 행과 열로 저장되며, 각 테이블은 고유한 스키마를 가지고 있어서 데이터의 구조가 명확하게 정의됩니다. SQL 데이터베이스는 데이터의 일관성과 무결성을 유지하는데 강력하며, 복잡한 쿼리와 트랜잭션을 지원하는 ACID(Atomicity, Consistency, Isolation, Durability) 원칙을 엄격하게 준수합니다. 대표적인 예로는 MySQL, PostgreSQL, Oracle 등이 있습니다.반면, NoSQL 데이터베이스는 비관계형 데이터베이스로, 스키마가 유연하거나 스키마가 없는 데이터 모델을 사용합니다. NoSQL은 문서(Document), 키-값(Key-Value), 와이드 컬럼(Wide-Column), 그래프(Graph) 등 다양한 데이터 모델을 제공하여, 다양한 형태의 데이터를 저장하고 관리할 수 있습니다. NoSQL 데이터베이스는 대량의 분산 데이터를 처리하는 데 적합하며, 수평적 확장성이 뛰어나 대용량 데이터 처리에 유리합니다. NoSQL은 일반적으로 BASE(Basically Available, Soft state, Eventual consistency) 모델을 따르며, 데이터의 빠른 읽기와 쓰기를 지원합니다. 대표적인 예로는 MongoDB, Cassandra, Redis 등이 있습니다.요약하면, SQL 데이터베이스는 엄격한 스키마, 복잡한 쿼리와 높은 데이터 일관성을 제공하는 반면, NoSQL 데이터베이스는 유연한 스키마, 빠른 읽기/쓰기 성능 및 뛰어난 수평적 확장성을 제공합니다. 각각의 선택은 애플리케이션의 요구사항, 데이터의 종류, 처리해야 할 데이터의 양 및 복잡성에 따라 달라질 수 있습니다.`,
];

const iOSQustions = [
  ' iOS 애플리케이션의 생명주기(Lifecycle)에 대해 설명해주세요.\n',
  'iOS의 주요 컴포넌트에는 어떤 것들이 있나요?\n',
  ' Swift에서 Optional이란 무엇이며, 왜 사용하나요?\n',
  'ARC(Automatic Reference Counting)에 대해 설명해주세요.\n',
  ' Storyboard와 XIB/NIB의 차이점은 무엇이며, 언제 각각을 사용하는 것이 좋나요?',
].map((each) => each.replace('\n', ''));

const iOSAnswers = [
  `iOS 애플리케이션의 생명주기는 앱이 시작되고 종료될 때까지의 과정을 나타냅니다. 이 생명주기는 주로 UIApplicationDelegate에 정의된 메소드를 통해 관리됩니다. 앱이 시작될 때 'didFinishLaunchingWithOptions' 메소드가 호출되며, 앱이 활성화 상태가 되기 전 'willEnterForeground'와 'didBecomeActive' 메소드가 순차적으로 호출됩니다. 앱이 백그라운드로 이동할 때는 'willResignActive'와 'didEnterBackground'가 호출되며, 앱이 종료될 때 'willTerminate'가 호출됩니다. 이러한 메소드들은 애플리케이션의 상태에 따라 적절한 작업을 수행하는 데 중요합니다.`,
  `iOS 애플리케이션의 주요 컴포넌트에는 ViewController, Views, Model 객체 등이 있습니다. ViewController는 화면의 내용을 관리하며, 사용자의 입력에 반응하고 모델 객체와의 상호작용을 담당합니다. Views는 사용자에게 정보를 표시하고, 사용자의 입력을 받는 인터페이스 요소입니다. Model 객체는 애플리케이션의 데이터와 비즈니스 로직을 담당합니다. 이 외에도 Delegate와 DataSource 같은 패턴이 데이터 처리와 이벤트 처리에 자주 사용됩니다.`,
  `Swift에서 Optional은 값이 있을 수도 있고, 없을 수도 있는 변수를 나타냅니다. Optional은 변수가 nil 값을 가질 수 있음을 나타내며, 이를 통해 런타임 오류를 방지할 수 있습니다. Optional을 사용함으로써 개발자는 명시적으로 값의 존재 여부를 검사하고 안전하게 처리할 수 있습니다. Optional 바인딩, Optional 체이닝, 강제 언래핑 등 여러 방법으로 Optional 값을 안전하게 다룰 수 있습니다.`,
  `ARC는 iOS에서 메모리 관리를 자동화하는 기술입니다. 각 객체에 대한 참조 횟수를 추적하여, 더 이상 필요하지 않은 객체의 메모리를 자동으로 해제합니다. 이는 개발자가 메모리 관리를 직접 처리하지 않아도 되게 하여, 메모리 누수와 같은 오류를 줄이는 데 도움이 됩니다. 하지만 강한 순환 참조(strong reference cycle)와 같은 문제는 여전히 주의해야 하며, weak나 unowned 참조를 사용하여 해결할 수 있습니다.`,
  `Storyboard는 애플리케이션의 여러 화면(ViewController)을 시각적으로 연결하는 데 사용되며, 전체 앱 플로우를 한 눈에 볼 수 있게 합니다. 반면, XIB/NIB 파일은 개별적인 사용자 인터페이스 요소를 디자인하는 데 사용됩니다. Storyboard는 앱의 전체 구조를 쉽게 이해하고 관리할 수 있게 해주지만, 큰 프로젝트에서는 복잡해질 수 있습니다. XIB/NIB는 재사용 가능한 인터페이스 요소를 만드는 데 유리하며, 작은 모듈을 개별적으로 관리할 수 있게 해줍니다.`,
];

const androidQuestions = [
  '안드로이드 애플리케이션의 생명주기(Lifecycle)에 대한 설명해주세요\n',
  '안드로이드의 주요 컴포넌트에 대한 설명해주세요\n',
  'Intent와 Intent Filter의 차이점과 사용 목적 설명해주세요\n',
  '안드로이드에서의 메모리 누수(Memory Leak)와 그 방지 방법 설명해주세요\n',
  'RecyclerView와 ListView의 차이점과 RecyclerView 사용 권장 사유 설명',
].map((each) => each.replace('\n', ''));

const androidAnswers = [
  `안드로이드 애플리케이션의 생명주기는 앱의 다양한 상태를 나타냅니다. 주로 Activity의 생명주기에 초점을 맞추는데, 이는 onCreate, onStart, onResume, onPause, onStop, onDestroy 같은 여러 콜백 메소드를 포함합니다. 예를 들어, onCreate에서는 액티비티가 처음 생성될 때 초기화 작업을 수행합니다. onResume은 액티비티가 사용자와 상호작용하기 직전에 호출되며, onPause는 액티비티가 더 이상 포커스를 갖지 않을 때 호출됩니다. onStop은 액티비티가 더 이상 사용자에게 보이지 않을 때 발생하며, onDestroy는 액티비티가 종료될 때 호출됩니다. 이러한 생명주기 메소드는 액티비티의 상태를 관리하는 데 중요하며, 메모리 관리와 리소스 해제에 핵심적인 역할을 합니다.`,
  `안드로이드의 주요 컴포넌트에는 Activity, Service, Broadcast Receiver, Content Provider가 있습니다. Activity는 사용자 인터페이스를 제공하는 컴포넌트로, 사용자가 앱과 상호작용하는 주된 방법입니다. Service는 백그라운드에서 실행되는 컴포넌트로, 사용자 인터페이스 없이 오래 걸리는 작업을 처리합니다. Broadcast Receiver는 시스템 또는 앱에서 발생하는 이벤트를 수신하는 컴포넌트입니다. 마지막으로, Content Provider는 앱 간 데이터를 공유하는 데 사용되며, 데이터의 저장 및 관리를 담당합니다`,
  `Intent는 애플리케이션 컴포넌트 간에 통신을 위한 메시징 객체입니다. 다른 액티비티를 시작하거나 서비스를 시작하는 등의 작업에 사용됩니다. Intent는 명시적(Explicit)과 암시적(Implicit) 두 종류가 있으며, 명시적 인텐트는 목표 컴포넌트를 직접 지정하는 반면, 암시적 인텐트는 시스템에 어떤 작업을 수행할 수 있는 컴포넌트를 찾아달라고 요청합니다. 반면, Intent Filter는 액티비티, 서비스 또는 브로드캐스트 리시버가 처리할 수 있는 인텐트 유형을 선언하는 데 사용됩니다. 이는 암시적 인텐트가 도착했을 때, 해당 인텐트를 처리할 수 있는 컴포넌트를 결정하는 데 중요한 역할을 합니다`,
  `메모리 누수는 안드로이드에서 더 이상 사용되지 않는 객체가 가비지 컬렉터에 의해 회수되지 않고 남아있는 상태를 말합니다. 이는 애플리케이션의 성능 저하와 강제 종료를 초래할 수 있습니다. 메모리 누수를 방지하기 위해서는 Context를 적절히 관리해야 합니다. 예를 들어, 비정적 내부 클래스와 익명 클래스는 외부 클래스의 인스턴스에 대한 참조를 유지하므로, 이러한 참조를 약한 참조(WeakReference)로 변경하거나, 생명주기에 맞춰 적절히 해제해야 합니다. 또한, 도구들을 사용하여 메모리 누수를 감지하고 분석할 수 있습니다`,
  `RecyclerView는 ListView의 개선된 버전으로, 데이터 컬렉션을 효율적으로 표시하기 위한 뷰입니다. RecyclerView는 ViewHolder 패턴을 사용하여 스크롤 성능을 개선하고, 레이아웃 매니저를 통해 다양한 형태의 리스트를 쉽게 구현할 수 있습니다. 반면, ListView는 비교적 단순한 세로 스크롤 리스트에 적합합니다. RecyclerView를 사용하는 이유는 더 나은 성능, 유연성, 확장성 때문입니다. 특히, 대량의 데이터와 동적인 콘텐츠 변경에 대응하고, 커스텀 레이아웃을 구현하는 경우 RecyclerView가 더 적합합니다`,
];

const csQuestions = [
  'OSI 7 계층 모델에 대해 설명해주세요.\n',
  '정규화(Normalization)의 목적은 무엇이며, 어떤 과정을 거치나요?\n',
  '데드락(Deadlock)이란 무엇이며, 어떻게 방지할 수 있나요?\n',
  '가비지 컬렉션(Garbage Collection)이란 무엇이며, 어떻게 작동하나요?\n',
  '다익스트라(Dijkstra) 알고리즘이란 무엇이며, 어떤 문제에 사용되나요?\n',
  'MVC 디자인 패턴이란 무엇이며, 어떤 장점이 있나요?\n',
  '멀티스레딩이란 무엇이며, 어떤 이점을 제공하나요?\n',
  '빅 오 표기법(Big O Notation)이란 무엇이며, 왜 중요한가요?',
].map((each) => each.replace('\n', ''));

const csAnswers = [
  `OSI(Open Systems Interconnection) 7계층 모델은 네트워크 내에서 데이터가 이동하는 방식을 이해하기 위해 개발된 개념적 모델입니다. 이 모델은 네트워크 통신을 일련의 계층으로 나누어, 각각의 과정을 더 잘 이해할 수 있도록 돕습니다.먼저, 물리 계층은 실제 전기 신호의 전송을 담당합니다. 이는 케이블, 광섬유, 전자기 파 등의 물리적 매체를 통해 데이터를 비트 형태로 전송하는 역할을 합니다. 이 계층의 주요 관심사는 데이터의 물리적 전달 방법입니다. 다음으로, 데이터 링크 계층은 물리 계층을 통해 전송된 데이터의 오류를 감지하고, 필요한 경우 재전송을 관리합니다. 또한, 이 계층은 네트워크 장비들 간의 물리적 주소를 정의하고, 효율적인 데이터 전송을 위한 프레임화를 담당합니다. 예를 들면, 이더넷 프레임이 여기에 해당합니다. 네트워크 계층은 데이터 패킷을 소스에서 목적지까지 라우팅하는 역할을 합니다. 이 계층은 데이터의 경로 결정 및 라우팅을 담당하며, IP 주소와 같은 논리적 주소를 사용합니다. 라우터와 같은 장비는 이 계층에서 작동합니다.전송 계층은 데이터의 신뢰성 있는 전송을 보장합니다. 이 계층은 데이터 전송의 신뢰성, 순서 및 흐름 제어 등을 관리하며, TCP와 UDP 프로토콜이 이 계층에 속합니다. 이 계층은 애플리케이션 간의 데이터 전송을 책임지며, 송수신자 간의 연결을 관리합니다.세션 계층은 네트워크 상의 두 장치 간의 연결, 즉 세션을 관리합니다. 이 계층은 세션의 설정, 유지, 종료를 담당하며, 애플리케이션 간의 대화 제어를 가능하게 합니다.표현 계층은 데이터의 형식과 인코딩을 관리합니다. 이 계층은 다양한 데이터 포맷 간의 변환, 데이터의 압축 암호화를 담당합니다. 즉, 애플리케이션이 이해할 수 있는 형태로 데이터를 변환하는 역할을 합니다.마지막으로, 응용 계층은 사용자와 가장 가까운 계층으로, 네트워크 서비스를 사용자에게 제공합니다. 이 계층은 웹 브라우저, 이메일 클라이언트와 같은 사용자 응용 프로그램이 위치하는 곳이며, 사용자의 네트워크 요구를 충족시키는 역할을 합니다.`,
  `정규화는 데이터베이스 구조의 설계를 최적화하여 중복을 최소화하고 데이터 무결성을 보장하는 과정입니다. 정규화는 데이터의 논리적 저장 구조를 개선함으로써, 데이터의 일관성과 무결성을 유지하고, 업데이트 시 발생할 수 있는 오류를 줄입니다. 기본적으로, 1NF는 반복되는 그룹을 제거하고, 2NF는 부분적 함수 종속성을 제거하며, 3NF는 이행적 종속성을 제거합니다. 이후에도 더 높은 정규형이 있지만, 대부분의 실용적인 어플리케이션에서는 3NF까지의 정규화가 일반적입니다. 각 단계에서의 목표는 데이터의 중복을 제거하고, 업데이트 이상 현상을 방지하는 것입니다.`,
  `데드락은 여러 프로세스나 스레드가 서로 상대방이 보유한 자원의 해제를 무한히 기다리는 상태를 의미합니다. 이 상태에서는 어떤 프로세스도 자신의 작업을 진행할 수 없게 됩니다. 데드락 방지를 위한 기법으로는 자원 할당 순서를 정하여 순환 대기를 방지하는 방법, 자원을 요청할 때 필요하지 않은 자원을 미리 해제하는 방법, 자원을 한 번에 모두 요청하여 대기를 방지하는 방법 등이 있습니다. 또한, 데드락의 발생 가능성을 줄이기 위해 자원의 할당과 요청을 신중하게 관리하고, 필요한 최소한의 자원만을 요청하도록 설계하는 것이 중요합니다.`,
  `가비지 컬렉션은 동적으로 할당된 메모리 중에서 더 이상 사용되지 않는 부분을 자동으로 찾아내고 해제하는 프로세스입니다. 이 과정은 프로그램의 안정성을 보장하고 메모리 누수를 방지합니다. 대표적인 방법으로는 '마크 앤 스위프(Mark-and-Sweep)'가 있습니다. 이 방식은 메모리에 접근 가능한 객체를 '마크'하고, 마크되지 않은 객체를 '스위프(삭제)'하여 메모리를 해제합니다. 이러한 과정을 통해, 프로그래머는 메모리 관리에 대한 부담을 줄이고, 애플리케이션의 성능과 안정성을 유지할 수 있습니다.`,
  `다익스트라 알고리즘은 가중치가 부여된 그래프에서 한 정점으로부터 다른 모든 정점까지의 최단 경로를 찾는 알고리즘입니다. 이 알고리즘은 우선순위 큐를 사용하여 가장 낮은 가중치를 가진 경로를 먼저 탐색합니다. 다익스트라 알고리즘은 네트워크 라우팅, 지도에서의 경로 찾기, 소셜 네트워킹 애플리케이션 등 다양한 분야에서 활용됩니다. 이 알고리즘의 주요 장점은 그 구현의 단순성과 널리 사용되는 문제에 대한 효율적인 해결책을 제공한다는 것입니다.`,
  `MVC(Model-View-Controller) 디자인 패턴은 애플리케이션을 세 가지 주요 구성 요소로 분리하여 관리하는 방법입니다. 'Model'은 데이터와 비즈니스 로직을 처리, 'View'는 사용자에게 정보를 표시, 'Controller'는 사용자의 입력을 처리하고 Model과 View를 연결합니다. 이 패턴의 장점은 애플리케이션의 유지보수성, 확장성 및 테스트 용이성을 개선하는 것입니다. MVC 패턴은 각 구성 요소의 독립적인 개발을 가능하게 하여, 큰 프로젝트에서 효율적인 협업과 모듈화를 촉진합니다.`,
  `멀티스레딩은 하나의 프로세스 내에서 여러 스레드를 동시에 실행하는 기술입니다. 이를 통해 여러 작업을 동시에 처리할 수 있으며, 자원의 사용을 최적화하고 애플리케이션의 응답 시간을 단축할 수 있습니다. 멀티스레딩은 특히 I/O 바운드 작업이나 사용자 인터페이스, 네트워크 통신과 같은 작업에서 유용합니다. 하지만 멀티스레딩은 동기화와 데이터 일관성 문제를 동반할 수 있으므로, 이를 관리하는 추가적인 로직이 필요합니다.`,
  `빅 오 표기법은 알고리즘의 시간 복잡도나 공간 복잡도를 표현하는 방법으로, 알고리즘의 성능을 분석하고 비교하는 데 사용됩니다. 이 표기법은 입력 크기가 무한대로 커질 때 알고리즘의 실행 시간이나 필요한 공간이 어떻게 증가하는지를 나타냅니다. 빅 오 표기법은 최악의 시나리오를 고려하므로, 실제 애플리케이션에서 알고리즘의 효율성을 평가하는 데 중요한 도구입니다. 예를 들어, O(n)은 선형 시간 알고리즘이고, O(n^2)는 이차 시간 알고리즘을 의미합니다. 이를 통해 소프트웨어 개발자는 알고리즘을 비교하고 최적의 알고리즘을 선택할 수 있습니다.`,
];

@Injectable()
export class AppService {
  constructor(
    private categoryRepository: CategoryRepository,
    private questionRepository: QuestionRepository,
    private answerRepository: AnswerRepository,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }
}
