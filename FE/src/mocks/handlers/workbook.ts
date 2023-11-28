import { API } from '@/constants/api';
import { HttpResponse, http } from 'msw';

const workbookHandlers = [
  http.post(API.WORKBOOK, ({ request }) => {
    return HttpResponse.json({ workbookId: 1 }, { status: 201 });
  }),
  http.get(API.WORKBOOK_CATEGORY_ID(), () => {
    return HttpResponse.json(
      [
        {
          workbookId: 1,
          nickname: 'milk717',
          profileImg: 'https://avatars.githubusercontent.com/u/66554167?v=4',
          copyCount: 717,
          title: '100% 취업 보장! 토스 FE 개발자의 특별 가이드',
          content:
            '취업하고싶어요! 돈벌고싶어요! 클라이밍, 피아노, 플라잉요가.... 하고싶은게 너무 많아요\n에버랜드, 스키장, 온천 가고싶어요.\n어디 놀러간 적이 100만년 전...',
        },
        {
          workbookId: 2,
          nickname: 'ndd',
          profileImg: 'https://avatars.githubusercontent.com/u/66554167?v=5',
          copyCount: 123,
          title: '당근마켓 합격자 면접',
          content: '당근마켓 가려면 이정도는 껌이라구~~',
        },
        {
          workbookId: 2,
          nickname: 'toss',
          profileImg: 'https://avatars.githubusercontent.com/u/66554167?v=6',
          copyCount: 9999,
          title: '토스 개발자의 영혼을 갈아넣은 면접',
          content: '토스 toss 토~~스',
        },
      ],
      { status: 200 }
    );
  }),
  http.get(API.WORKBOOK_MY, () => {
    return HttpResponse.json(
      [
        {
          workbookId: 1,
          title: '100% 취업 보장! 토스 FE 개발자의 특별 가이드',
        },
        { workbookId: 2, title: '당근마켓 합격자 면접' },
        { workbookId: 3, title: '토스 개발자의 영혼을 갈아넣은 면접' },
      ],
      { status: 200 }
    );
  }),
  http.get(API.WORKBOOK_ID(), ({ request }) => {
    return HttpResponse.json(
      {
        workbookId: 1,
        nickname: 'milk717',
        profileImg: 'https://avatars.githubusercontent.com/u/66554167?v=4',
        copyCount: 717,
        title: '100% 취업 보장! 토스 FE 개발자의 특별 가이드',
        content:
          '취업하고싶어요! 돈벌고싶어요! 클라이밍, 피아노, 플라잉요가.... 하고싶은게 너무 많아요\n에버랜드, 스키장, 온천 가고싶어요.\n어디 놀러간 적이 100만년 전...',
      },
      { status: 201 }
    );
  }),
  http.patch(API.WORKBOOK_ID(), ({ request }) => {
    return new HttpResponse(null, { status: 204 });
  }),
  http.delete(API.WORKBOOK_ID(), () => {
    return new HttpResponse(null, { status: 204 });
  }),
];

export default workbookHandlers;