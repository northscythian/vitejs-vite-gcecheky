import { useState } from "react";

type QuestionType = "text" | "number" | "textarea" | "radio" | "checkbox";

interface Question {
  id: number;
  section: string;
  question: string;
  type: QuestionType;
  placeholder?: string;
  hint?: string;
  options?: string[];
  optional?: boolean;
}

const questions: Question[] = [
  {id:1,section:"Личные данные",question:"Как вас зовут?",type:"text",placeholder:"Ваше полное имя (ФИО)"},
  {id:2,section:"Личные данные",question:"Сколько вам лет?",type:"number",placeholder:"Укажите ваш возраст",hint:"Принимаем кандидатов от 18 до 60 лет"},
  {id:3,section:"Личные данные",question:"Ваш пол",type:"radio",options:["Мужской","Женский"]},
  {id:4,section:"Личные данные",question:"Из какого вы города / региона Казахстана?",type:"text",placeholder:"Например: Алматы, Шымкент, Астана..."},
  {id:5,section:"Личные данные",question:"Ваш контактный номер телефона",type:"text",placeholder:"+7 (___) ___-__-__"},
  {id:6,section:"Личные данные",question:"Ваш WhatsApp / Telegram (если отличается от телефона)",type:"text",placeholder:"Номер или ник",optional:true},
  {id:7,section:"Семья и обязательства",question:"Ваше семейное положение",type:"radio",options:["Холост / Не замужем","Женат / Замужем","Разведён(а)","Вдовец / Вдова"]},
  {id:8,section:"Семья и обязательства",question:"Есть ли у вас несовершеннолетние дети?",type:"radio",options:["Нет","Да, 1 ребёнок","Да, 2 детей","Да, 3 и более"]},
  {id:9,section:"Опыт работы",question:"Где вы работали последние 2–3 года? (Место работы, должность)",type:"textarea",placeholder:"Например: ТОО «Строй-Монтаж», разнорабочий, 2022–2024...",hint:"Опишите каждое место работы кратко"},
  {id:10,section:"Опыт работы",question:"Есть ли у вас специальность или профессиональные навыки?",type:"checkbox",options:["Строитель / Разнорабочий","Сварщик","Плотник / Столяр","Маляр / Штукатур","Водитель","Упаковщик / Сортировщик","Сельскохозяйственный рабочий","Уборщик / Клинер","Нет специальности","Другое"]},
  {id:11,section:"Опыт работы",question:"Был ли у вас ранее опыт работы за границей?",type:"radio",options:["Нет, еду впервые","Да, в России","Да, в Польше","Да, в другой стране"]},
  {id:12,section:"Физическая готовность",question:"Готовы ли вы к физическому труду?",type:"radio",options:["Да, без проблем — я привык(ла) к физической работе","Да, готов(а), но есть ограничения по здоровью","Предпочитаю лёгкий физический труд","Не готов(а) к тяжёлой физической работе"]},
  {id:13,section:"Физическая готовность",question:"Есть ли у вас хронические заболевания или травмы, влияющие на работоспособность?",type:"radio",options:["Нет, здоров(а)","Есть незначительные — не мешают работе","Есть — готов(а) рассказать подробнее"]},
  {id:14,section:"Документы",question:"Есть ли у вас действующий загранпаспорт?",type:"radio",options:["Да, действующий","Да, но скоро заканчивается","Нет, нужно оформить"],hint:"Для работы в Польше необходим действующий загранпаспорт"},
  {id:15,section:"Документы",question:"Есть ли у вас запрет на выезд из Казахстана?",type:"radio",options:["Нет","Да","Не знаю / Не проверял(а)"],hint:"Запрет может быть наложен судом, налоговой службой или другими органами"},
  {id:16,section:"Финансовое положение",question:"Есть ли у вас просроченные кредиты или задолженности?",type:"radio",options:["Нет","Есть небольшая задолженность, решаю вопрос","Да, есть значительные просроченные кредиты"],hint:"Наличие долгов может влиять на получение визы"},
  {id:17,section:"Финансовое положение",question:"Каков ваш текущий доход в месяц (в тенге)?",type:"radio",options:["До 100 000 тг","100 000 – 200 000 тг","200 000 – 400 000 тг","Свыше 400 000 тг","Сейчас не работаю"]},
  {id:18,section:"Мотивация и цель",question:"Какова ваша главная цель поездки в Польшу?",type:"checkbox",options:["Заработать деньги для семьи","Погасить кредиты / долги","Накопить на жильё","Открыть своё дело после возвращения","Получить опыт работы за рубежом","Возможная эмиграция","Другое"]},
  {id:19,section:"Мотивация и цель",question:"На какой срок вы планируете уехать?",type:"radio",options:["До 3 месяцев","3–6 месяцев","6–12 месяцев","Более года","Пока не определился(ась)"]},
  {id:20,section:"Мотивация и цель",question:"Какой вид работы вы предпочитаете?",type:"checkbox",options:["Завод / производство","Стройка","Склад / логистика","Сельское хозяйство (сбор урожая)","Уборка / клининг","Грузчик / разнорабочий","Не имеет значения — главное работа"]},
  {id:21,section:"Условия и ожидания",question:"Важно ли вам наличие жилья от работодателя?",type:"radio",options:["Да, обязательно — сам(а) снять не смогу","Желательно, но могу снять сам(а)","Готов(а) снимать самостоятельно"]},
  {id:22,section:"Условия и ожидания",question:"Какой минимальный заработок (в PLN/месяц) вас устроит?",type:"radio",options:["До 3 000 PLN","3 000 – 4 000 PLN","4 000 – 5 000 PLN","Свыше 5 000 PLN"],hint:"Средняя зарплата разнорабочего в Польше — 3 500–4 500 PLN нетто"},
  {id:23,section:"Условия и ожидания",question:"Готовы ли вы работать сверхурочно и в ночные смены?",type:"radio",options:["Да, готов(а) — хочу зарабатывать больше","Иногда могу","Нет, только стандартный график"]},
  {id:24,section:"Языки и общение",question:"Знаете ли вы польский или другие языки?",type:"checkbox",options:["Нет, только казахский / русский","Немного польский","Польский — базовый уровень","Польский — разговорный","Английский","Другой язык"]},
  {id:25,section:"Дополнительно",question:"Есть ли что-то важное, что вы хотите сообщить о себе?",type:"textarea",placeholder:"Любая информация, которую считаете нужной...",optional:true},
];

const sections = [...new Set(questions.map((q) => q.section))];

export default function Questionnaire() {
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [currentSection, setCurrentSection] = useState<number>(0);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<number, boolean>>({});

  const sectionQuestions = questions.filter(
    (q) => q.section === sections[currentSection]
  );

  const updateAnswer = (id: number, value: any) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => ({ ...prev, [id]: false }));
  };

  const toggleCheckbox = (id: number, option: string) => {
    const current: string[] = answers[id] || [];
    const updated = current.includes(option)
      ? current.filter((o) => o !== option)
      : [...current, option];
    updateAnswer(id, updated);
  };

  const validateSection = (): boolean => {
    const required = sectionQuestions.filter((q) => !q.optional);
    const newErrors: Record<number, boolean> = {};
    required.forEach((q) => {
      const ans = answers[q.id];
      if (!ans || (Array.isArray(ans) && ans.length === 0) || ans === "") {
        newErrors[q.id] = true;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const next = () => {
    if (validateSection()) {
      if (currentSection < sections.length - 1) setCurrentSection((s) => s + 1);
      else setSubmitted(true);
      window.scrollTo(0, 0);
    }
  };

  const prev = () => {
    setCurrentSection((s) => s - 1);
    window.scrollTo(0, 0);
  };

  const progress = ((currentSection + 1) / sections.length) * 100;

  if (submitted) {
    return (
      <div style={styles.page}>
        <div style={styles.successCard}>
          <div style={styles.successIcon}>✅</div>
          <h2 style={styles.successTitle}>Анкета успешно отправлена!</h2>
          <p style={styles.successText}>
            Благодарим вас за заполнение анкеты. Наш менеджер свяжется с вами в
            течение 1–2 рабочих дней для обсуждения дальнейших шагов.
          </p>
          <div style={styles.successContact}>
            📱 WhatsApp / Telegram доступны для связи
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.flagRow}>
          <span>🇰🇿</span>
          <span style={styles.arrow}>→</span>
          <span>🇵🇱</span>
        </div>
        <h1 style={styles.title}>Анкета соискателя</h1>
        <p style={styles.subtitle}>Работа в Польше · Заполните все поля честно и внимательно</p>
      </div>

      {/* Progress */}
      <div style={styles.progressWrapper}>
        <div style={styles.progressBar}>
          <div style={{ ...styles.progressFill, width: `${progress}%` }} />
        </div>
        <div style={styles.progressLabels}>
          {sections.map((s, i) => (
            <span
              key={s}
              style={{
                ...styles.sectionDot,
                background: i <= currentSection ? "#e63946" : "#dde1e7",
              }}
            />
          ))}
        </div>
        <p style={styles.progressText}>
          Раздел {currentSection + 1} из {sections.length}:{" "}
          <strong>{sections[currentSection]}</strong>
        </p>
      </div>

      {/* Questions */}
      <div style={styles.card}>
        {sectionQuestions.map((q) => (
          <div key={q.id} style={styles.questionBlock}>
            <label style={styles.questionLabel}>
              {q.question}
              {!q.optional && <span style={styles.required}>*</span>}
            </label>
            {q.hint && <p style={styles.hint}>{q.hint}</p>}
            {errors[q.id] && (
              <p style={styles.error}>⚠ Пожалуйста, заполните это поле</p>
            )}

            {(q.type === "text" || q.type === "number") && (
              <input
                style={{
                  ...styles.input,
                  borderColor: errors[q.id] ? "#e63946" : "#dde1e7",
                }}
                type={q.type}
                placeholder={q.placeholder}
                value={answers[q.id] || ""}
                onChange={(e) => updateAnswer(q.id, e.target.value)}
              />
            )}

            {q.type === "textarea" && (
              <textarea
                style={{
                  ...styles.textarea,
                  borderColor: errors[q.id] ? "#e63946" : "#dde1e7",
                }}
                placeholder={q.placeholder}
                value={answers[q.id] || ""}
                onChange={(e) => updateAnswer(q.id, e.target.value)}
                rows={4}
              />
            )}

            {q.type === "radio" && (
              <div style={styles.optionsList}>
                {q.options?.map((opt) => (
                  <label key={opt} style={styles.optionLabel}>
                    <input
                      type="radio"
                      name={`q${q.id}`}
                      value={opt}
                      checked={answers[q.id] === opt}
                      onChange={() => updateAnswer(q.id, opt)}
                      style={{ display: "none" }}
                    />
                    <span
                      style={{
                        ...styles.optionText,
                        background: answers[q.id] === opt ? "#fff0f1" : "#f8f9fa",
                        borderColor: answers[q.id] === opt ? "#e63946" : "#dde1e7",
                        color: answers[q.id] === opt ? "#c1121f" : "#333",
                        fontWeight: answers[q.id] === opt ? 600 : 400,
                      }}
                    >
                      {opt}
                    </span>
                  </label>
                ))}
              </div>
            )}

            {q.type === "checkbox" && (
              <div style={styles.optionsList}>
                {q.options?.map((opt) => {
                  const selected = (answers[q.id] || []).includes(opt);
                  return (
                    <label key={opt} style={styles.optionLabel}>
                      <input
                        type="checkbox"
                        checked={selected}
                        onChange={() => toggleCheckbox(q.id, opt)}
                        style={{ display: "none" }}
                      />
                      <span
                        style={{
                          ...styles.optionText,
                          background: selected ? "#fff0f1" : "#f8f9fa",
                          borderColor: selected ? "#e63946" : "#dde1e7",
                          color: selected ? "#c1121f" : "#333",
                          fontWeight: selected ? 600 : 400,
                        }}
                      >
                        {selected ? "✓ " : ""}{opt}
                      </span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div style={styles.navRow}>
        {currentSection > 0 && (
          <button style={styles.btnBack} onClick={prev}>
            ← Назад
          </button>
        )}
        <button style={styles.btnNext} onClick={next}>
          {currentSection < sections.length - 1 ? "Далее →" : "Отправить анкету ✓"}
        </button>
      </div>

      <p style={styles.footer}>
        Все данные используются исключительно для подбора вакансий и хранятся конфиденциально
      </p>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: { minHeight:"100vh", background:"linear-gradient(135deg,#f5f7fa,#e8ecf0)", fontFamily:"'Georgia',serif", padding:"24px 16px 48px", boxSizing:"border-box" },
  header: { textAlign:"center", marginBottom:"28px" },
  flagRow: { fontSize:"32px", marginBottom:"10px", letterSpacing:"8px" },
  arrow: { fontSize:"20px", color:"#999" },
  title: { fontSize:"26px", fontWeight:700, color:"#1a1a2e", margin:"0 0 6px", letterSpacing:"-0.5px" },
  subtitle: { fontSize:"13px", color:"#666", margin:0, letterSpacing:"0.5px" },
  progressWrapper: { maxWidth:"620px", margin:"0 auto 20px", padding:"0 4px" },
  progressBar: { height:"6px", background:"#dde1e7", borderRadius:"99px", overflow:"hidden", marginBottom:"10px" },
  progressFill: { height:"100%", background:"linear-gradient(90deg,#e63946,#c1121f)", borderRadius:"99px", transition:"width 0.4s ease" },
  progressLabels: { display:"flex", gap:"8px", justifyContent:"center", marginBottom:"8px" },
  sectionDot: { width:"10px", height:"10px", borderRadius:"50%", display:"inline-block", transition:"background 0.3s" },
  progressText: { fontSize:"13px", color:"#555", margin:0, textAlign:"center" },
  card: { maxWidth:"620px", margin:"0 auto 20px", background:"#fff", borderRadius:"16px", padding:"28px 24px", boxShadow:"0 4px 24px rgba(0,0,0,0.08)" },
  questionBlock: { marginBottom:"28px", paddingBottom:"24px", borderBottom:"1px solid #f0f0f0" },
  questionLabel: { display:"block", fontSize:"15px", fontWeight:600, color:"#1a1a2e", marginBottom:"6px", lineHeight:1.5 },
  required: { color:"#e63946", marginLeft:"4px" },
  hint: { fontSize:"12px", color:"#888", margin:"0 0 8px", fontStyle:"italic", lineHeight:1.5 },
  error: { fontSize:"12px", color:"#e63946", margin:"0 0 6px", fontWeight:600 },
  input: { width:"100%", padding:"11px 14px", fontSize:"14px", border:"1.5px solid #dde1e7", borderRadius:"8px", outline:"none", boxSizing:"border-box", color:"#222", transition:"border-color 0.2s", fontFamily:"inherit" },
  textarea: { width:"100%", padding:"11px 14px", fontSize:"14px", border:"1.5px solid #dde1e7", borderRadius:"8px", outline:"none", boxSizing:"border-box", color:"#222", resize:"vertical", fontFamily:"inherit", lineHeight:1.6 },
  optionsList: { display:"flex", flexDirection:"column", gap:"8px", marginTop:"6px" },
  optionLabel: { display:"flex", alignItems:"flex-start", cursor:"pointer" },
  optionText: { flex:1, padding:"10px 14px", border:"1.5px solid #dde1e7", borderRadius:"8px", fontSize:"14px", cursor:"pointer", transition:"all 0.15s ease", lineHeight:1.4 },
  navRow: { maxWidth:"620px", margin:"0 auto", display:"flex", gap:"12px", justifyContent:"flex-end" },
  btnBack: { padding:"13px 24px", background:"#fff", border:"1.5px solid #dde1e7", borderRadius:"10px", fontSize:"14px", fontWeight:600, cursor:"pointer", color:"#555", fontFamily:"inherit" },
  btnNext: { padding:"13px 28px", background:"linear-gradient(135deg,#e63946,#c1121f)", border:"none", borderRadius:"10px", fontSize:"14px", fontWeight:700, cursor:"pointer", color:"#fff", boxShadow:"0 4px 14px rgba(230,57,70,0.35)", letterSpacing:"0.3px", fontFamily:"inherit" },
  successCard: { maxWidth:"480px", margin:"80px auto", background:"#fff", borderRadius:"20px", padding:"48px 32px", textAlign:"center", boxShadow:"0 8px 40px rgba(0,0,0,0.10)" },
  successIcon: { fontSize:"56px", marginBottom:"16px" },
  successTitle: { fontSize:"22px", fontWeight:700, color:"#1a1a2e", margin:"0 0 12px" },
  successText: { fontSize:"15px", color:"#555", lineHeight:1.7, margin:"0 0 20px" },
  successContact: { background:"#f5f7fa", borderRadius:"10px", padding:"14px", fontSize:"14px", color:"#444" },
  footer: { textAlign:"center", fontSize:"11px", color:"#aaa", maxWidth:"620px", margin:"16px auto 0", lineHeight:1.6 },
};
