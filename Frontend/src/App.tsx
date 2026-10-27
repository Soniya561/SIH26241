import { useEffect, useMemo, useState } from 'react'

type Career = { id: string; name: string; category: string; blurb: string; skills: string[]; icon: string }

const photo =
  'https://images.unsplash.com/photo-1682962232755-f1d051ddb638?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1200'

const groups: Record<string, string[]> = {
  'Electrical & electronics': ['Electrician', 'Domestic Wiring Technician', 'Electrical Technician', 'Electronics Mechanic', 'CCTV Installation Technician', 'Solar PV Installer', 'Electrical Appliance Repair Technician', 'EV Service Technician'],
  'Automotive & mechanical': ['Automotive Service Technician', 'Two-Wheeler Service Technician', 'Four-Wheeler Service Technician', 'Automotive Electrician', 'CNC Machine Operator', 'Fitter', 'Turner', 'Machinist', 'Welding Technician', 'Industrial Maintenance Technician', 'Refrigeration and AC Technician', 'Hydraulic and Pneumatic Technician'],
  'Computer & digital': ['Computer Hardware Technician', 'Computer Network Support Technician', 'IT Support Technician', 'Web Development', 'Frontend Web Development', 'Graphic Design', 'UI/UX Design', 'Digital Marketing', 'Software Testing', 'Cybersecurity Fundamentals'],
  'Healthcare support': ['General Duty Assistant', 'Healthcare Assistant', 'Phlebotomy Technician', 'Medical Laboratory Assistant', 'Medical Records Assistant', 'Dental Assistant', 'Home Healthcare Assistant', 'Patient Care Assistant'],
  'Hospitality & food': ['Food Production Assistant', 'Cookery', 'Bakery and Confectionery', 'Food and Beverage Service', 'Front Office Associate', 'Housekeeping Associate', 'Travel and Tourism Assistant', 'Barista'],
  'Construction': ['Mason', 'Plumber', 'Carpenter', 'Survey Assistant', 'Draughtsman — Civil', 'Interior Installation Technician', 'Building Maintenance Technician'],
  'Business & retail': ['Retail Sales Associate', 'Customer Service Associate', 'Office Administration', 'Accounting Assistant', 'Tally and Bookkeeping', 'Logistics Assistant', 'Warehouse Operations'],
  'Green skills': ['Nursery Worker', 'Horticulture Assistant', 'Organic Farming Fundamentals', 'Food Processing Technician', 'Irrigation System Technician', 'Waste Management Operations', 'Water Treatment Plant Assistant'],
}

const icons: Record<string, string> = {
  'Electrical & electronics': '⚡', 'Automotive & mechanical': '⚙', 'Computer & digital': '⌘',
  'Healthcare support': '✚', 'Hospitality & food': '◒', Construction: '⌂', 'Business & retail': '▣', 'Green skills': '⌁',
}

const careers: Career[] = Object.entries(groups).flatMap(([category, names]) =>
  names.map((name, i) => ({
    id: name.toLowerCase().replace(/[^\w]+/g, '-'),
    name, category, icon: icons[category],
    blurb: `${name} combines practical learning with real-world skills for a range of work environments.`,
    skills: i % 2 ? ['Practical work', 'Problem-solving', 'Safety'] : ['Technical skills', 'Teamwork', 'Quality checks'],
  })),
)

const pathFor = () => window.location.pathname
const go = (path: string) => {
  history.pushState({}, '', path)
  window.dispatchEvent(new PopStateEvent('popstate'))
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function Icon({ name }: { name: 'arrow' | 'bookmark' | 'search' | 'menu' | 'check' | 'mic' }) {
  const paths = {
    arrow: <><path d="M5 12h14M14 7l5 5-5 5" /></>,
    bookmark: <path d="M6 4h12v16l-6-4-6 4V4z" />,
    search: <><circle cx="11" cy="11" r="7" /><path d="m16 16 4 4" /></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    mic: <><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M6 11a6 6 0 0 0 12 0M12 17v4" /></>,
  }
  return <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">{paths[name]}</svg>
}

function Button({ children, to, kind = 'primary', onClick, type = 'button' }: { children: React.ReactNode; to?: string; kind?: string; onClick?: () => void; type?: 'button' | 'submit' }) {
  return <button type={type} className={`btn ${kind}`} onClick={() => { onClick?.(); if (to) go(to) }}>{children}</button>
}

function Brand() {
  return <button className="brand" onClick={() => go('/')} aria-label="Kaushal Setu home"><span className="brandmark"><i /><i /><i /></span><span><b>KAUSHAL SETU</b><small>Your Skills. Your Future. Together.</small></span></button>
}

function Header({ menu, setMenu }: { menu: boolean; setMenu: (x: boolean) => void }) {
  return <header><div className="nav-wrap"><Brand /><nav className={menu ? 'open' : ''}>
    <button onClick={() => go('/')}>Home</button><button onClick={() => go('/careers')}>Explore careers</button>
    <button onClick={() => go('/how-it-works')}>How it works</button><button onClick={() => go('/family')}>For families</button>
  </nav><div className="nav-actions"><button className="language">EN <span>/ தமிழ்</span></button><button className="signin" onClick={() => go('/login')}>Sign in</button><Button to="/onboarding">Get started</Button></div>
  <button className="menu" aria-label="Menu" onClick={() => setMenu(!menu)}><Icon name="menu" /></button></div></header>
}

function Footer() {
  return <footer><div><Brand /><p>Explore. Understand. Experience.<br />Decide together.</p></div><div><b>Explore</b><button onClick={() => go('/careers')}>Careers</button><button onClick={() => go('/how-it-works')}>How it works</button><button onClick={() => go('/career-proof')}>Career Proof</button></div><div><b>Support</b><button onClick={() => go('/help')}>Help centre</button><button onClick={() => go('/privacy')}>Privacy & consent</button><button onClick={() => go('/referrals')}>Talk to a person</button></div><div><b>Language</b><button>English</button><button>தமிழ்</button></div></footer>
}

function Home() {
  const interests = [
    ['⚙', 'I like fixing things', 'Electrical & electronics'], ['⌘', 'I enjoy working with technology', 'Computer & digital'],
    ['✦', 'I like designing and creating', 'Computer & digital'], ['◎', 'I enjoy working with people', 'Business & retail'],
    ['✚', 'I am interested in healthcare', 'Healthcare support'], ['◉', 'I want to work with machines', 'Automotive & mechanical'],
    ['◒', 'I enjoy cooking and hospitality', 'Hospitality & food'], ['⌁', 'Nature and renewable energy', 'Green skills'],
  ]
  const popular = careers.filter(c => ['Electrician', 'Solar PV Installer', 'Automotive Service Technician', 'Welding Technician', 'CNC Machine Operator', 'Healthcare Assistant', 'Computer Hardware Technician', 'Refrigeration and AC Technician'].includes(c.name))
  return <main>
    <section className="hero shell"><div className="hero-copy"><span className="eyebrow">Career guidance for the whole family</span>
      <h1>A brighter future starts with <em>understanding.</em></h1>
      <p>Explore skill-based careers, understand real opportunities, and make confident career decisions together.</p>
      <div className="button-row"><Button to="/careers">Explore careers <Icon name="arrow" /></Button><Button to="/how-it-works" kind="secondary">How it works</Button></div>
      <div className="trust"><span><Icon name="check" /> Career information with sources</span><span><Icon name="check" /> Tamil and English guidance</span><span><Icon name="check" /> Real-world exploration</span></div>
    </div><div className="hero-visual"><img src={photo} alt="Students and mentors discussing opportunities together" /><div className="quote"><span>“</span><p>We found questions we could ask together.</p><small>A family exploring technical careers</small></div><div className="sun" /></div></section>
    <section className="section shell"><div className="section-head"><div><span className="eyebrow">Start with what you enjoy</span><h2>What feels like you?</h2></div><p>You don't need to know the job title yet. Choose an interest and we'll show you where it could lead.</p></div>
      <div className="interest-grid">{interests.map(([ic, label, category]) => <button key={label} className="interest" onClick={() => go(`/careers?category=${encodeURIComponent(category)}`)}><span>{ic}</span><b>{label}</b><Icon name="arrow" /></button>)}</div>
    </section>
    <section className="section warm"><div className="shell"><div className="section-head"><div><span className="eyebrow">Popular pathways</span><h2>Careers people are exploring</h2></div><Button to="/careers" kind="link">View all careers <Icon name="arrow" /></Button></div><div className="course-grid">{popular.slice(0,4).map(c => <CourseCard key={c.id} career={c} />)}</div></div></section>
    <section className="section shell proof-intro"><div><span className="eyebrow">The Career Proof Loop</span><h2>Don't just read about a career.<br /><em>Experience it.</em></h2><p>Turn uncertainty into useful questions, then answer them through a training-centre visit, practical demonstration, or conversation with a professional.</p><Button to="/career-proof">Explore the Career Proof Loop <Icon name="arrow" /></Button></div><div className="proof-steps">{['Choose a career', 'Name the question', 'Plan a real activity', 'Reflect together'].map((x,i)=><div key={x}><span>0{i+1}</span><b>{x}</b></div>)}</div></section>
  </main>
}

function CourseCard({ career, saved = false, toggle }: { career: Career; saved?: boolean; toggle?: (id: string) => void }) {
  return <article className="course-card"><div className="card-top"><span className="course-icon">{career.icon}</span><button className={`save ${saved ? 'active':''}`} aria-label="Save career" onClick={() => toggle?.(career.id)}><Icon name="bookmark" /></button></div><span className="category">{career.category}</span><h3>{career.name}</h3><p>{career.blurb}</p><div className="chips">{career.skills.slice(0,2).map(x=><span key={x}>{x}</span>)}</div><button className="card-link" onClick={() => go(`/careers/${career.id}`)}>View career <Icon name="arrow" /></button></article>
}

function Careers({ saved, toggle }: { saved: string[]; toggle: (id: string) => void }) {
  const params = new URLSearchParams(location.search)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState(params.get('category') || 'All careers')
  const filtered = careers.filter(c => (category === 'All careers' || c.category === category) && `${c.name} ${c.category} ${c.skills}`.toLowerCase().includes(search.toLowerCase()))
  return <main className="page shell"><div className="page-title"><span className="eyebrow">Explore at your pace</span><h1>Find careers that match your interests.</h1><p>Browse sample career information. Training availability and facts are shown only when verified.</p></div>
    <div className="searchbar"><Icon name="search" /><input aria-label="Search careers" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search a course, skill, or career…" /></div>
    <div className="explorer"><aside><b>Career categories</b><button className={category==='All careers'?'selected':''} onClick={()=>setCategory('All careers')}>All careers <span>{careers.length}</span></button>{Object.keys(groups).map(x=><button className={category===x?'selected':''} onClick={()=>setCategory(x)} key={x}>{icons[x]} {x}<span>{groups[x].length}</span></button>)}<hr/><b>Learning preferences</b>{['Classroom', 'Hands-on', 'Blended learning'].map(x=><label key={x}><input type="checkbox"/>{x}</label>)}</aside>
      <div className="results"><div className="results-head"><p><b>{filtered.length} career pathways</b><br/><span>Sample catalogue • Details requiring evidence are clearly marked</span></p>{saved.length>0&&<Button to="/compare" kind="secondary">Compare saved ({saved.length})</Button>}</div>
      {filtered.length ? <div className="course-grid">{filtered.map(c=><CourseCard key={c.id} career={c} saved={saved.includes(c.id)} toggle={toggle}/>)}</div> : <div className="empty"><h3>No close matches yet</h3><p>Try widening your search or explore another category.</p><Button onClick={()=>{setSearch('');setCategory('All careers')}}>Browse all careers</Button></div>}</div></div>
  </main>
}

function CareerDetail({ id, saved, toggle }: { id: string; saved: string[]; toggle: (id:string)=>void }) {
  const c = careers.find(x=>x.id===id) || careers[0]
  return <main><section className="detail-hero"><div className="shell detail-grid"><div><button className="back" onClick={()=>go('/careers')}>← Back to all careers</button><span className="eyebrow">{c.category}</span><h1>{c.name}</h1><p>{c.blurb} Learn what the work may involve, what to verify, and what questions to ask before choosing training.</p><div className="button-row"><Button onClick={()=>toggle(c.id)}>{saved.includes(c.id)?'Saved':'Save career'} <Icon name="bookmark"/></Button><Button to="/compare" kind="secondary">Compare</Button></div></div><div className="detail-symbol">{c.icon}<small>Career discovery profile</small></div></div></section>
    <div className="shell detail-body"><article><section><span className="section-number">01</span><h2>What is this career?</h2><p>People working in {c.name.toLowerCase()} roles use practical knowledge, tools, and safety processes to complete and check their work. The exact scope depends on the workplace and qualification.</p></section>
      <section><span className="section-number">02</span><h2>Skills you may develop</h2><div className="skill-list">{[...c.skills,'Reading instructions','Communication','Workplace safety'].map(x=><span key={x}><Icon name="check"/>{x}</span>)}</div></section>
      <section><span className="section-number">03</span><h2>Training and eligibility</h2><div className="facts">{['Eligibility','Training duration','Course fees','Local providers'].map(x=><div key={x}><small>{x}</small><b>Not yet verified</b><span>Ask a recognised training provider</span></div>)}</div><div className="notice"><b>Why some information is unavailable</b><p>Requirements differ by qualification and location. We do not guess fees, recognition, or availability.</p></div></section>
      <section><span className="section-number">04</span><h2>Questions worth asking</h2><ol className="questions"><li>What qualification will I receive and who recognises it?</li><li>How much learning happens in a real workshop?</li><li>What safety practices are taught and assessed?</li><li>What progression routes are available after training?</li></ol></section>
    </article><aside className="next-card"><span>YOUR NEXT STEP</span><h3>Turn a question into evidence</h3><p>Plan a visit or conversation to understand what this work is really like.</p><Button to="/career-proof">Create a proof plan <Icon name="arrow"/></Button><button onClick={()=>go('/family')}>Discuss with family</button><button onClick={()=>go('/pathways')}>Explore pathways</button></aside></div>
  </main>
}

function JourneyStrip({ current=3 }: { current?: number }) {
  return <div className="journey-strip">{['Discover','Explore','Shortlist','Discuss','Compare','Experience','Review'].map((x,i)=><div className={i<current?'done':i===current?'current':''} key={x}><span>{i<current?'✓':i+1}</span><small>{x}</small></div>)}</div>
}

function Dashboard({ saved }: { saved: string[] }) {
  const selected = careers.filter(c=>saved.includes(c.id)).slice(0,3)
  return <main className="page shell"><div className="dash-title"><div><span className="eyebrow">My career journey</span><h1>Welcome back, Ananya.</h1><p>Let's take the next useful step—together.</p></div><div className="profile-dot">AS</div></div><JourneyStrip/>
    <section className="next-step"><div><span>NEXT STEP</span><h2>Compare the careers you've saved</h2><p>Look at the differences together. There is no automatic winner—only clearer questions.</p><Button to="/compare">Continue my journey <Icon name="arrow"/></Button></div><strong>04<small>of 07 stages</small></strong></section>
    <div className="dashboard-grid"><section><div className="section-head compact"><div><h2>My shortlisted careers</h2><p>{selected.length || 0} options saved</p></div><Button to="/careers" kind="link">Explore more</Button></div>{selected.length?<div className="saved-list">{selected.map(c=><button key={c.id} onClick={()=>go(`/careers/${c.id}`)}><span className="course-icon">{c.icon}</span><span><b>{c.name}</b><small>{c.category}</small></span><Icon name="arrow"/></button>)}</div>:<div className="empty"><h3>Your shortlist is ready to begin</h3><p>Save careers that make you curious.</p><Button to="/careers">Start exploring</Button></div>}</section>
      <aside className="family-status"><span>FAMILY SPACE</span><h3>Invite someone you trust</h3><p>Share only the career options and questions you choose.</p><Button to="/family" kind="secondary">Invite family</Button></aside></div>
  </main>
}

function Compare({ saved }: { saved: string[] }) {
  const chosen = (careers.filter(c=>saved.includes(c.id)).length ? careers.filter(c=>saved.includes(c.id)) : [careers[0], careers[9], careers[21]]).slice(0,3)
  return <main className="page shell"><div className="page-title"><span className="eyebrow">Compare together</span><h1>See the differences clearly.</h1><p>Use your priorities to guide a conversation—not to declare a winner.</p></div><div className="priority-row"><b>What matters most?</b>{['Interest match','Affordable training','Local availability','Future study'].map((x,i)=><button className={i===0?'active':''} key={x}>{x}</button>)}</div>
    <div className="compare-grid">{chosen.map(c=><article key={c.id}><span className="course-icon">{c.icon}</span><span className="category">{c.category}</span><h2>{c.name}</h2><p>{c.blurb}</p>{[['Typical skills',c.skills.join(', ')],['Eligibility','Not yet verified'],['Duration & fees','Not yet verified'],['Local training','Provider data needed'],['Further study','Check qualification pathway']].map(([a,b])=><div className="compare-fact" key={a}><small>{a}</small><b>{b}</b></div>)}<Button to={`/careers/${c.id}`} kind="link">View full details <Icon name="arrow"/></Button></article>)}</div>
    <div className="action-bar"><p><b>Found a question that facts alone can't answer?</b><br/>Turn it into a real-world learning activity.</p><Button to="/career-proof">Create a Career Proof Plan</Button></div>
  </main>
}

function Onboarding() {
  const [step,setStep]=useState(1); const [picks,setPicks]=useState<string[]>([])
  const choices = step===1?['Studying in school','Completed school','Studying in college','Already working','Looking for a new skill','Prefer not to say']:step===2?['Fixing electrical equipment','Repairing vehicles','Working with machines','Computers and technology','Designing and creating','Cooking and hospitality','Healthcare support','Renewable energy','Working with people']:['Practical, hands-on work','Computer-based work','Creative work','Working with people','Outdoor work','A mixture of activities']
  if(step===4) return <main className="onboarding complete"><div className="success-mark"><Icon name="check"/></div><span className="eyebrow">Your starting point is ready</span><h1>Let's explore what fits you.</h1><p>Your suggestions will be explained using the interests you selected. You can change these answers at any time.</p><div className="selection-summary">{picks.slice(-4).map(x=><span key={x}>{x}</span>)}</div><Button to="/careers">Explore my matches <Icon name="arrow"/></Button><button onClick={()=>setStep(1)}>Edit my answers</button></main>
  return <main className="onboarding"><div className="onboard-progress"><Brand/><span>Step {step} of 3</span><div><i style={{width:`${step/3*100}%`}}/></div></div><div className="onboard-card"><span className="eyebrow">{step===1?'About you':step===2?'Your interests':'How you like to work'}</span><h1>{step===1?'What stage are you at right now?':step===2?'What are you curious about?':'What kind of work feels right?'}</h1><p>Select the options that feel closest. There are no wrong answers.</p><div className="choice-grid">{choices.map(x=><button className={picks.includes(x)?'selected':''} onClick={()=>setPicks(p=>p.includes(x)?p.filter(a=>a!==x):[...p,x])} key={x}><span>{picks.includes(x)?'✓':'○'}</span>{x}</button>)}</div><div className="onboard-actions"><Button kind="secondary" onClick={()=>step>1?setStep(step-1):go('/')}>Back</Button><Button onClick={()=>setStep(step+1)}>{step===3?'Finish':'Continue'} <Icon name="arrow"/></Button></div></div></main>
}

function Family() {
  const [sent,setSent]=useState(false)
  return <StandardPage eyebrow="A shared space, with consent" title="Bring your family into the conversation." intro="Invite a parent or guardian to review the career options you choose to share. Your private answers and counselling conversations stay private.">
    <div className="two-col"><section className="form-panel"><h2>{sent?'Invitation sent':'Invite someone you trust'}</h2>{sent?<div className="sent"><div className="success-mark"><Icon name="check"/></div><div><b>Invitation ready</b><p>Prototype invitation created for parent@example.com. No real email was sent.</p></div></div>:<><label>Parent or guardian's name<input placeholder="Enter their name"/></label><label>Email or mobile number<input placeholder="Email or mobile"/></label><label className="consent"><input type="checkbox"/> I understand which shortlist information will be shared.</label><Button onClick={()=>setSent(true)}>Create invitation</Button></>}</section><section className="shared-goal"><span>SHARED FAMILY SPACE</span><h2>Different questions.<br/>One shared future.</h2><blockquote>“Find a practical career with credible opportunities to keep learning.”</blockquote><Button to="/perspective-gap" kind="secondary">Open perspective map</Button></section></div>
  </StandardPage>
}

function Perspective() {
  return <StandardPage eyebrow="Family perspective map" title="Different concerns. One shared future." intro="See what matters to each person and choose the next useful piece of evidence.">
    <div className="perspectives"><article><span>STUDENT VIEW</span><h2>“I enjoy working with electrical equipment.”</h2><div className="chips"><span>Hands-on work</span><span>Problem-solving</span><span>Learn by doing</span></div></article><article><span>FAMILY VIEW</span><h2>“I want to understand safety and job prospects.”</h2><div className="chips"><span>Safety</span><span>Stable work</span><span>Quality training</span></div></article></div>
    <section className="common-ground"><span className="eyebrow">Common ground</span><h2>A practical career with a safe, credible route to progress.</h2><div><p><b>Question that needs evidence</b><br/>What safety practices are taught during training?</p><Button to="/career-proof">Plan a training-centre visit <Icon name="arrow"/></Button></div></section>
  </StandardPage>
}

function CareerProof() {
  const [stage,setStage]=useState(1)
  const activities=['Training-centre visit','Practical demonstration','Conversation with a professional','Alumni conversation','Career guidance session']
  return <StandardPage eyebrow="Career Proof Loop" title="Experience the career before deciding." intro="Turn one unresolved concern into a practical, real-world learning activity. No booking is made by this prototype.">
    <JourneyStrip current={stage-1}/><div className="proof-layout"><section className="form-panel"><span className="eyebrow">Step {stage} of 3</span>{stage===1&&<><h2>What do you want to understand?</h2><label>Career<select><option>Electrician</option><option>Solar PV Installer</option><option>Healthcare Assistant</option></select></label><label>Concern to investigate<textarea placeholder="For example: I want to understand safety practices and the daily work environment."/></label><Button onClick={()=>setStage(2)}>Choose an activity <Icon name="arrow"/></Button></>}{stage===2&&<><h2>Choose a real-world activity</h2><div className="activity-list">{activities.map(x=><button key={x} onClick={()=>setStage(3)}><span>○</span><b>{x}</b><Icon name="arrow"/></button>)}</div></>}{stage===3&&<><div className="success-mark"><Icon name="check"/></div><h2>Your activity checklist is ready.</h2><p>Contact a training provider, confirm accessibility and safety, and ask the questions in your plan.</p><Button to="/dashboard">Save to my journey</Button></>}</section><aside className="prep"><span>QUESTIONS TO TAKE WITH YOU</span>{['What skills are used daily?','What safety practices are important?','What qualifications are needed?','What does training cost?','What progression may be available?'].map((x,i)=><p key={x}><b>0{i+1}</b>{x}</p>)}</aside></div>
  </StandardPage>
}

function Counsellor() {
  const [messages,setMessages]=useState([{role:'guide',text:'Vanakkam. I can help you make sense of career information and prepare questions. What would you like to explore?'}]); const [text,setText]=useState('')
  const send=()=>{if(!text)return;setMessages([...messages,{role:'user',text},{role:'guide',text:'That is a useful question. Exact training requirements vary by qualification and region, so I would check the awarding body and ask the provider for written details. Would you like a checklist?'}]);setText('')}
  return <main className="chat-page"><aside><Brand/><button onClick={()=>go('/dashboard')}>← My journey</button><div><span>GUIDANCE TOOLS</span><button className="active">AI counsellor</button><button onClick={()=>go('/referrals')}>Human support</button><button onClick={()=>go('/career-proof')}>Career Proof Plan</button></div><small>This prototype does not replace a qualified counsellor.</small></aside><section><header><div><h2>Career guidance conversation</h2><span className="online">Prototype guidance • English</span></div><button>தமிழ்</button></header><div className="messages">{messages.map((m,i)=><div key={i} className={`message ${m.role}`}><span>{m.role==='guide'?'KS':'You'}</span><p>{m.text}</p></div>)}<div className="suggestions">{['What does an electrician do?','How do I compare two courses?','What should my parents ask?'].map(x=><button key={x} onClick={()=>setText(x)}>{x}</button>)}</div></div><div className="composer"><button aria-label="Voice input"><Icon name="mic"/></button><input value={text} onChange={e=>setText(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send()} placeholder="Ask a career question…"/><Button onClick={send}>Send <Icon name="arrow"/></Button></div></section></main>
}

function StandardPage({ eyebrow, title, intro, children }: {eyebrow:string;title:string;intro:string;children:React.ReactNode}) {
  return <main className="page shell"><div className="page-title"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{intro}</p></div>{children}</main>
}

function InfoPage({ path }: {path:string}) {
  const data: Record<string,[string,string,string]> = {
    '/how-it-works':['The journey','Explore. Understand. Experience. Decide together.','KAUSHAL SETU helps families move from curiosity to evidence—without forcing a career decision.'],
    '/help':['Help centre','How can we help?','Simple guidance for every part of your career exploration journey.'],
    '/privacy':['Privacy & consent','Your information. Your choices.','You choose what to share with family members and can review or withdraw consent at any time.'],
    '/referrals':['Human support','Sometimes, a conversation with a person helps most.','Request support from an authorised counsellor. No appointment is confirmed until a counsellor responds.'],
    '/pathways':['Career pathways','Your first skill can lead to more possibilities.','Explore possible routes without assuming that a qualification guarantees admission, promotion, or work.'],
    '/saved-careers':['My shortlist','Careers worth another look.','Keep your options together, compare their evidence, and choose a useful next step.'],
    '/settings':['Settings','Make KAUSHAL SETU work for you.','Manage language, accessibility, family participation, consent, notifications, and account security.'],
    '/admin':['Programme insights','Understand where support is needed.','This prototype has no programme records yet. Metrics will appear only when real, privacy-safe aggregate data is available.'],
    '/counsellor/cases':['Counsellor cases','Support families with permission.','No cases are assigned in this prototype. Authorised counsellors see only consented information.'],
    '/login':['Welcome back','Continue your career journey.','Prototype sign-in: no secure authentication is connected.'],
    '/register':['Create your account','Start exploring with confidence.','Prototype registration: details are not sent to a server.'],
  }
  const d=data[path]||['KAUSHAL SETU','Your next step, made clearer.','Explore careers and decide together.']
  const isAuth=['/login','/register'].includes(path)
  return <StandardPage eyebrow={d[0]} title={d[1]} intro={d[2]}>{isAuth?<section className="auth form-panel"><label>Email or mobile<input placeholder="you@example.com"/></label><label>Password<input type="password" placeholder="Enter password"/></label><Button to="/dashboard">{path==='/login'?'Continue prototype':'Create prototype account'}</Button><p><button onClick={()=>go(path==='/login'?'/register':'/login')}>{path==='/login'?'New here? Create an account':'Already have an account? Sign in'}</button></p></section>:path==='/how-it-works'?<div className="big-steps">{['Discover your interests','Explore credible options','Discuss family questions','Compare pathways','Experience a career','Choose the next step together'].map((x,i)=><article key={x}><span>0{i+1}</span><h2>{x}</h2><p>{i===5?'A decision can be to keep exploring. There is no pressure.':'Clear guidance and practical actions keep the journey moving.'}</p></article>)}</div>:<div className="info-box"><h2>{path==='/admin'?'No records yet':'A clear next step'}</h2><p>{path==='/privacy'?'Family members see only the shortlist and questions you explicitly share. Private counselling stays private.':'Explore the sample catalogue or continue your guided career journey.'}</p><Button to="/careers">Explore careers <Icon name="arrow"/></Button></div>}</StandardPage>
}

function App() {
  const [path,setPath]=useState(pathFor()); const [saved,setSaved]=useState<string[]>(['electrician','solar-pv-installer','computer-hardware-technician']); const [menu,setMenu]=useState(false)
  useEffect(()=>{const f=()=>{setPath(pathFor());setMenu(false)};addEventListener('popstate',f);return()=>removeEventListener('popstate',f)},[])
  const toggle=(id:string)=>setSaved(s=>s.includes(id)?s.filter(x=>x!==id):[...s,id])
  const route = useMemo(()=>{
    if(path==='/')return <Home/>
    if(path==='/careers')return <Careers saved={saved} toggle={toggle}/>
    if(path.startsWith('/careers/'))return <CareerDetail id={path.split('/')[2]} saved={saved} toggle={toggle}/>
    if(path==='/dashboard')return <Dashboard saved={saved}/>
    if(path==='/compare')return <Compare saved={saved}/>
    if(path==='/onboarding')return <Onboarding/>
    if(path==='/family')return <Family/>
    if(path==='/perspective-gap')return <Perspective/>
    if(path==='/career-proof')return <CareerProof/>
    if(path==='/counsellor')return <Counsellor/>
    return <InfoPage path={path}/>
  },[path,saved])
  const special=path==='/onboarding'||path==='/counsellor'
  return <>{!special&&<Header menu={menu} setMenu={setMenu}/>} {route} {!special&&<Footer/>}<nav className="mobile-bottom"><button onClick={()=>go('/dashboard')}>⌂<span>Home</span></button><button onClick={()=>go('/careers')}>⌕<span>Explore</span></button><button onClick={()=>go('/dashboard')}>◎<span>Journey</span></button><button onClick={()=>go('/family')}>◉<span>Family</span></button><button onClick={()=>go('/help')}>?<span>Help</span></button></nav></>
}

export default App
