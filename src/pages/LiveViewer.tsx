import { useState } from 'react'
import { Button } from '../components/Button'
import { Icon } from '../components/Icon'

type MenuKey = 'live' | 'scheduled' | 'past'
type TabKey = 'guide' | 'product' | 'event'
type Theme = 'light' | 'dark'

interface ChatMsg {
  name: string
  text: string
  tone?: 'primary' | 'notice' | 'default'
}

const CHAT_MESSAGES: ChatMsg[] = [
  { name: '감독_TOTY팬', text: 'TOTY 너무 기대돼요!', tone: 'primary' },
  { name: '축덕', text: '아이콘 매치 사인 유니폼 당첨 기원 🙏' },
  { name: 'FC매니저', text: '이번 시즌 최고의 이벤트' },
  { name: '구단주92', text: '캐시팩 고민 중..' },
  { name: '프리스타일러', text: '방금 구매했어요!' },
  { name: '운영자', text: '본 라이브는 종료되었습니다. 다시보기로 즐겨주세요.', tone: 'notice' },
]

const GUIDES: { id: string; title: string; body: string }[] = [
  {
    id: '670',
    title: '마케팅 활용 안내',
    body:
      '※ 본 라이브에서는 화면에 송출되는 넥슨 닉네임, 구단주명, 채팅을 녹화할 수 있으며, 이는 넥슨코리아가 제공하는 서비스 및 관련 프로모션에 마케팅, 홍보 목적으로 활용될 수 있습니다.\n\n' +
      '※ 이벤트 당첨자 안내\n' +
      '라이브 방송에서 진행된 이벤트 당첨에 대한 안내는 1월 29일(목)에 진행될 예정입니다. 당첨자 발표 이전에 구매 취소 및 청약 철회를 하실 경우 당첨이 취소됩니다.\n' +
      '아이콘 매치 사인 유니폼에 당첨되신 분들에게는 배송을 위한 개인 정보 수집 안내가 진행될 예정이며, 개인 정보 입력 기간 내 입력을 하지 않을 시 당첨이 취소될 수 있으며, 이후 배송은 어렵습니다.\n' +
      '개인 정보 입력을 오기입하여 발생하는 오배송에 대해서는 책임지지 않습니다.',
  },
  {
    id: '671',
    title: '상품 구매 주의사항',
    body:
      '※ 라이브 상품은 방송 시작 후 1시간 후까지 구매하실 수 있으며, 라이브 상품 링크를 통해 구매 가능합니다.\n' +
      '※ 라이브 시간 내 구매 가능한 상품은 계정당 구매 제한이 있는 상품으로, 구매 제한 횟수를 초과하여 구매는 어렵습니다.\n' +
      '※ 청약 철회는 기존 상품과 동일하게 적용되며, 구매일로부터 7일이 경과하거나 보관함 수령 및 사용한 경우 청약 철회가 불가합니다.\n' +
      '※ 청약 철회를 원하실 경우, 인게임 아이템 수령 창구에서 청약 철회 진행하실 수 있습니다.\n' +
      '※ 환불 승인된 아이템을 사용한 경우, 정책에 따라 게임 이용 제한이 될 수 있습니다.\n\n' +
      '※ 미성년자가 법정 대리인의 동의 없이 결제한 경우, 본인 또는 법정대리인은 결제를 취소할 수 있습니다.\n' +
      '※ 확률 정보 : Happy New 26 TOTY에서 판매되는 상품의 확률 정보는 추후 라이브 쇼핑 이후 확인하실 수 있습니다.',
  },
  {
    id: '672',
    title: '유의사항',
    body:
      '※ 이벤트 내용 및 경품, 구매 특전은 라이브 방송 상황에 따라 부득이하게 변경될 수 있습니다.\n' +
      '※ Happy New 26TOTY에서 판매되는 상품은 FC/MC가 아닌 넥슨캐시 결제로 구매 가능합니다.',
  },
]

export default function LiveViewer() {
  const [menu, setMenu] = useState<MenuKey>('live')
  const [tab, setTab] = useState<TabKey>('guide')
  const [openGuides, setOpenGuides] = useState<Record<string, boolean>>({ '670': true })
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(1284)
  const [theme, setTheme] = useState<Theme>('light')

  const toggleGuide = (id: string) =>
    setOpenGuides((prev) => ({ ...prev, [id]: !prev[id] }))

  const toggleLike = () => {
    setLiked((v) => !v)
    setLikeCount((n) => (liked ? n - 1 : n + 1))
  }

  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'))
  const isDark = theme === 'dark'

  return (
    <div className={isDark ? 'dark' : ''}>
      <div className="min-h-screen bg-lb-200 font-sans text-bc-1000 dark:bg-db-200 dark:text-bc-100">
        {/* ========== GNB ========== */}
        <header className="sticky top-0 z-50 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)] dark:bg-db-100 dark:shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
          <div className="mx-auto flex h-16 max-w-[1440px] items-center px-10">
            <a href="/" className="inline-flex items-center gap-2 text-pc-800 text-20-bold tracking-[-0.5px] dark:text-pc-500" aria-label="넥슨 라이브">
              <span className="relative inline-block h-2.5 w-2.5 rounded-full bg-error shadow-[0_0_0_3px_rgba(239,93,93,0.2)] animate-pulse" />
              넥슨 라이브
            </a>

            <nav className="ml-15 flex gap-9" style={{ marginLeft: 60 }} aria-label="Primary">
              {([
                ['live', '라이브'],
                ['scheduled', '예정된 라이브'],
                ['past', '지난 라이브'],
              ] as [MenuKey, string][]).map(([key, label]) => {
                const active = menu === key
                return (
                  <button
                    key={key}
                    onClick={() => setMenu(key)}
                    className={[
                      'relative inline-flex h-16 items-center px-0.5 text-16 transition-colors',
                      active
                        ? 'text-pc-800 font-bold dark:text-pc-500'
                        : 'text-bc-1000 hover:text-pc-800 dark:text-bc-200 dark:hover:text-pc-500',
                    ].join(' ')}
                  >
                    {label}
                    {active && <span className="absolute inset-x-0 bottom-0 h-0.5 bg-pc-800 dark:bg-pc-500" />}
                  </button>
                )
              })}
            </nav>

            <div className="ml-auto flex items-center gap-2">
              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                aria-label={isDark ? '라이트 모드로 전환' : '다크 모드로 전환'}
                className="grid h-10 w-10 place-items-center rounded-full transition-colors hover:bg-lb-300 dark:hover:bg-bc-800"
              >
                {isDark ? (
                  // Sun icon (to switch to light)
                  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                  </svg>
                ) : (
                  // Moon icon (to switch to dark)
                  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-bc-1000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                )}
              </button>

              {([
                { label: '알림',   name: 'Alarm' },
                { label: '검색',   name: 'Search' },
                { label: '설정',   name: 'Settings' },
                { label: '프로필', name: 'User' },
              ] as const).map(({ label, name }) => (
                <button
                  key={label}
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-full transition-colors hover:bg-lb-300 dark:hover:bg-bc-800"
                >
                  <Icon name={name} stroke="2px" size={20} alt={label} className={isDark ? 'invert' : ''} />
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* ========== Hero ========== */}
        <section className="mx-auto grid max-w-[1440px] grid-cols-1 bg-db-200 lg:grid-cols-[1fr_360px]">
          {/* Player */}
          <div
            className="relative aspect-video overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #111521 0%, #0A4B85 100%)' }}
          >
            <span className="absolute left-6 top-6 inline-flex h-7 items-center gap-1.5 rounded-4 bg-black/60 px-2.5 text-12-bold text-white backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-bc-400" />
              방송 종료
            </span>

            <button
              aria-label="다시보기 재생"
              className="group absolute left-1/2 top-1/2 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-white/60 bg-white/10 text-white transition hover:scale-105 hover:bg-white/20"
            >
              <svg viewBox="0 0 24 24" className="ml-1 h-8 w-8 fill-current">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>

            <div
              className="absolute inset-x-0 bottom-0 px-10 pb-8 pt-20 text-white"
              style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 100%)' }}
            >
              <h1 className="text-28-bold mb-2">[FC온라인] Happy New 26TOTY!</h1>
              <div className="flex items-center gap-3 text-14-regular text-bc-200">
                <span>2026.01.16 (금) 오전 10:00</span>
                <span className="h-[3px] w-[3px] rounded-full bg-bc-400" />
                <span>가로형 스트리밍</span>
              </div>
            </div>
          </div>

          {/* Chat */}
          <aside className="flex flex-col border-l border-bc-100 bg-white dark:border-db-100 dark:bg-db-100" aria-label="실시간 채팅">
            <div className="flex h-14 items-center justify-between border-b border-bc-100 px-5 dark:border-bc-800">
              <span className="text-16-bold">실시간 채팅</span>
              <span className="inline-flex items-center gap-1 text-12-regular text-bc-700 dark:text-bc-400">누적 시청 48,217</span>
            </div>

            <div className="flex flex-1 flex-col gap-3.5 overflow-y-auto px-5 py-4">
              {CHAT_MESSAGES.map((m, i) => (
                <div key={i} className="flex gap-2">
                  <div className="h-7 w-7 flex-shrink-0 rounded-full bg-lb-300 dark:bg-bc-800" />
                  <div className="min-w-0 flex-1">
                    <div
                      className={[
                        'text-12-bold mb-0.5',
                        m.tone === 'primary'
                          ? 'text-pc-800 dark:text-pc-500'
                          : m.tone === 'notice'
                          ? 'text-error'
                          : 'text-bc-900 dark:text-bc-200',
                      ].join(' ')}
                    >
                      {m.name}
                    </div>
                    <div className="text-14-regular break-all text-bc-1000 dark:text-bc-100">{m.text}</div>
                  </div>
                </div>
              ))}
            </div>

            <form className="flex gap-2 border-t border-bc-100 px-5 py-3 dark:border-bc-800" onSubmit={(e) => e.preventDefault()}>
              <input
                type="text"
                disabled
                placeholder="채팅 입력이 종료되었습니다"
                className="flex-1 h-10 rounded-4 bg-lb-300 px-3 text-14-regular text-bc-500 tracking-tight-sm cursor-not-allowed dark:bg-bc-900 dark:text-bc-500"
              />
              <button
                type="submit"
                disabled
                className="h-10 rounded-4 bg-bc-200 px-3.5 text-14-bold text-bc-500 cursor-not-allowed dark:bg-bc-800 dark:text-bc-500"
              >
                전송
              </button>
            </form>
          </aside>
        </section>

        {/* ========== Info ========== */}
        <section className="border-t border-bc-100 bg-lb-100 py-10 lg:py-14 dark:border-db-100 dark:bg-db-200">
          <div className="mx-auto flex max-w-[1360px] flex-col gap-6 px-5 lg:px-10">
            {/* Title block */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-6 items-center rounded-3 bg-pc-100 px-2 text-12-bold text-pc-800 dark:bg-pc-1000 dark:text-pc-300">FC온라인</span>
                <span className="inline-flex h-6 items-center rounded-3 bg-bc-100 px-2 text-12-bold text-bc-700 dark:bg-bc-800 dark:text-bc-300">방송 종료</span>
              </div>

              <h2 className="text-32-bold">[FC온라인] Happy New 26TOTY!</h2>

              <div className="flex flex-wrap items-center gap-4 text-14-regular text-bc-700 dark:text-bc-400">
                <span>방송일&nbsp;&nbsp;2026.01.16 (금) 오전 10:00</span>
                <span className="h-[3px] w-[3px] rounded-full bg-bc-300 dark:bg-bc-700" />
                <span>실시간 스트리밍</span>
                <span className="h-[3px] w-[3px] rounded-full bg-bc-300 dark:bg-bc-700" />
                <span>IVS</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant="filled"
                colorType="primary1"
                size="medium"
                leftIcon={<svg viewBox="0 0 24 24" className="h-full w-full fill-current"><path d="M8 5v14l11-7z" /></svg>}
                iconPosition="left"
              >
                다시보기
              </Button>
              <Button
                variant="outlined"
                colorType="secondary1"
                size="medium"
                onClick={toggleLike}
                leftIcon={<Icon name="Favorite" stroke="2px" size={20} className={isDark ? 'invert' : ''} />}
                iconPosition="left"
                className={[
                  liked ? 'text-error' : '',
                  'dark:border-bc-700 dark:text-bc-200 dark:hover:bg-bc-800',
                ].join(' ')}
              >
                좋아요&nbsp;&nbsp;{likeCount.toLocaleString()}
              </Button>
              <Button
                variant="outlined"
                colorType="secondary1"
                size="medium"
                leftIcon={<Icon name="Share" stroke="2px" size={20} className={isDark ? 'invert' : ''} />}
                iconPosition="left"
                className="dark:border-bc-700 dark:text-bc-200 dark:hover:bg-bc-800"
              >
                공유
              </Button>
            </div>

            <div className="h-px bg-bc-100 dark:bg-db-100" />

            {/* Tabs */}
            <nav className="flex border-b border-bc-100 dark:border-db-100" aria-label="라이브 정보">
              {([
                ['guide', '라이브 안내'],
                ['product', '상품'],
                ['event', '이벤트'],
              ] as [TabKey, string][]).map(([key, label]) => {
                const active = tab === key
                return (
                  <button
                    key={key}
                    onClick={() => setTab(key)}
                    className={[
                      'relative inline-flex h-12 min-w-[120px] items-center justify-center px-5 text-16 transition-colors',
                      active
                        ? 'text-pc-800 font-bold dark:text-pc-500'
                        : 'text-bc-700 hover:text-bc-1000 dark:text-bc-400 dark:hover:text-bc-100',
                    ].join(' ')}
                  >
                    {label}
                    {active && <span className="absolute inset-x-0 -bottom-px h-0.5 bg-pc-800 dark:bg-pc-500" />}
                  </button>
                )
              })}
            </nav>

            {/* Guides */}
            {tab === 'guide' && (
              <div className="flex flex-col gap-3">
                {GUIDES.map((g) => {
                  const open = !!openGuides[g.id]
                  return (
                    <div
                      key={g.id}
                      className="overflow-hidden rounded-5 border border-bc-100 bg-white transition-colors hover:border-bc-200 dark:border-db-100 dark:bg-db-100 dark:hover:border-bc-700"
                    >
                      <button
                        type="button"
                        onClick={() => toggleGuide(g.id)}
                        className="flex w-full items-center justify-between px-6 py-5"
                        aria-expanded={open}
                      >
                        <span className="text-18-bold text-bc-1000 dark:text-bc-100">{g.title}</span>
                        <svg
                          viewBox="0 0 24 24"
                          className={['h-5 w-5 fill-bc-700 transition-transform dark:fill-bc-400', open ? 'rotate-180' : ''].join(' ')}
                        >
                          <path d="M7 10l5 5 5-5z" />
                        </svg>
                      </button>
                      {open && (
                        <div className="whitespace-pre-line border-t border-bc-100 px-6 pb-6 pt-4 text-14-regular text-bc-700 dark:border-bc-800 dark:text-bc-300">
                          {g.body}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}

            {tab === 'product' && (
              <div className="rounded-5 border border-bc-100 bg-white px-6 py-12 text-center text-14-regular text-bc-500 dark:border-db-100 dark:bg-db-100 dark:text-bc-400">
                판매된 상품 정보는 라이브 종료 후 확인할 수 없습니다.
              </div>
            )}
            {tab === 'event' && (
              <div className="rounded-5 border border-bc-100 bg-white px-6 py-12 text-center text-14-regular text-bc-500 dark:border-db-100 dark:bg-db-100 dark:text-bc-400">
                이벤트 당첨자 발표는 2026.01.29(목)에 진행됩니다.
              </div>
            )}
          </div>
        </section>

        {/* ========== Footer ========== */}
        <footer className="bg-lb-300 px-10 py-8 text-center dark:bg-db-100">
          <p className="mb-1.5 text-12-regular text-bc-700 dark:text-bc-400">© NEXON Korea Corporation. All Rights Reserved.</p>
          <nav className="text-12-regular text-bc-500 dark:text-bc-500" aria-label="Footer">
            <a href="#" className="mx-1.5 hover:text-pc-800 dark:hover:text-pc-500">이용약관</a>·
            <a href="#" className="mx-1.5 hover:text-pc-800 dark:hover:text-pc-500">개인정보처리방침</a>·
            <a href="#" className="mx-1.5 hover:text-pc-800 dark:hover:text-pc-500">청소년보호정책</a>·
            <a href="#" className="mx-1.5 hover:text-pc-800 dark:hover:text-pc-500">고객센터</a>
          </nav>
        </footer>
      </div>
    </div>
  )
}
