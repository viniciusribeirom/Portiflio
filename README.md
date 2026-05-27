# 👨‍💻 Portfólio Vinicius Ribeiro

> **Computer Science Student | Web Developer | QA | Pentest Enthusiast**

Portfólio profissional moderno, responsivo e com design premium desenvolvido em HTML5, CSS3 e JavaScript vanilla.

---

## 🚀 Deploy

O projeto está pronto para deploy nas seguintes plataformas:

### **Vercel**
1. Faça fork deste repositório
2. Acesse [vercel.com](https://vercel.com)
3. Importe o repositório
4. Deploy automático a cada push

### **Netlify**
1. Arraste a pasta `portfolio/` para [netlify.com](https://netlify.com)
2. Ou conecte via Git

### **GitHub Pages**
1. Vá em Settings > Pages
2. Selecione a branch principal
3. Escolha a pasta raiz
4. Seu site estará em `https://seuusuario.github.io/portfolio/`

---

## 📁 Estrutura de Pastas

```
portfolio/
│
├── index.html              # Página inicial (Hero, Sobre, Tech, Stats, Projetos)
├── about.html              # Página "Sobre Mim" completa
├── projects.html           # Página de projetos com filtros
├── contact.html            # Página de contato com formulário
│
├── assets/
│   ├── img/                # Imagens do projeto
│   ├── icons/              # Ícones e favicon
│   └── fonts/              # Fontes locais (opcional)
│
├── css/
│   ├── style.css           # Estilos principais, variáveis, componentes
│   ├── animations.css      # Keyframes, animações de scroll, hover effects
│   └── responsive.css      # Media queries para todos os breakpoints
│
├── js/
│   ├── main.js             # Utilitários, efeitos adicionais, toast notifications
│   ├── animations.js       # Intersection Observer, typing, scroll progress
│   └── particles.js        # Sistema de partículas em canvas
│
└── README.md               # Este arquivo
```

---

## ✨ Funcionalidades

### Design & UI
- 🌙 **Tema Dark/Light** com toggle e persistência no localStorage
- 🎨 **Gradientes tecnológicos** e efeitos neon sutis
- 💎 **Glassmorphism** na navbar fixa
- 🎯 **Cursor personalizado** (desktop apenas)
- 📱 **Totalmente responsivo** (mobile, tablet, desktop, 4K)

### Animações
- ✨ **Scroll animations** com Intersection Observer
- ⌨️ **Efeito typing** no hero
- 🔢 **Contadores animados** nas estatísticas
- 📊 **Barras de skills** animadas
- 🌌 **Partículas conectadas** no fundo
- 🎆 **Partículas no clique**
- 🔄 **Loader animado** na entrada

### Interatividade
- 📧 **Formulário de contato** funcional (preparado para EmailJS/Formspree)
- 🔗 **Links sociais** com hover effects
- 📋 **Copiar email** para clipboard
- 📑 **Filtro de projetos** por categoria
- 📖 **FAQ** na página de contato

### Performance & SEO
- ⚡ **Lazy loading** em imagens
- 🔍 **Meta tags SEO** completas
- 🌐 **Open Graph** para redes sociais
- ♿ **Acessibilidade** (prefers-reduced-motion)
- 🖨️ **Estilos de impressão**

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Uso |
|------------|-----|
| HTML5 | Estrutura semântica |
| CSS3 | Estilos, variáveis, grid, flexbox |
| JavaScript (ES6+) | Interatividade, animações, lógica |
| Font Awesome | Ícones |
| Google Fonts | Tipografia (Inter, JetBrains Mono) |
| Canvas API | Sistema de partículas |

---

## 📝 Como Personalizar

### 1. Informações Pessoais
Edite os seguintes arquivos:
- `index.html` - Nome, cargo, descrição
- `about.html` - Biografia, timeline
- `contact.html` - Email, redes sociais
- `projects.html` - Projetos e links

### 2. Cores do Tema
Edite as variáveis CSS em `css/style.css`:
```css
:root {
    --accent-cyan: #00d4ff;
    --accent-purple: #a855f7;
    --accent-green: #22c55e;
    /* ... */
}
```

### 3. Projetos
Adicione novos cards em `projects.html` seguindo o padrão:
```html
<div class="project-card" data-category="java">
    <div class="project-image">
        <img src="URL_DA_IMAGEM" alt="Nome do Projeto">
    </div>
    <div class="project-content">
        <h3>Nome do Projeto</h3>
        <p>Descrição...</p>
        <div class="project-tags">
            <span class="tag tag-cyan">Java</span>
        </div>
    </div>
</div>
```

### 4. Integrar Formulário de Contato
Substitua o `action` do form em `contact.html`:

**Opção A - Formspree (Gratuito):**
```html
<form action="https://formspree.io/f/SEU_ID" method="POST">
```

**Opção B - EmailJS:**
Siga a documentação do EmailJS e adicione o SDK.

---

## 🎨 Design System

### Cores Principais
- **Cyan**: `#00d4ff` - Destaques primários
- **Purple**: `#a855f7` - Destaques secundários
- **Green**: `#22c55e` - Sucesso/positivo
- **Orange**: `#f97316` - Avisos
- **Pink**: `#ec4899` - Destaques terciários

### Tipografia
- **Primária**: Inter (sans-serif)
- **Monospace**: JetBrains Mono (código, labels)

### Breakpoints
- `576px` - Mobile
- `768px` - Tablet
- `992px` - Desktop
- `1200px` - Large Desktop
- `1920px` - 4K

---

## 📄 Licença

Este projeto está sob a licença MIT. Sinta-se livre para usar como template para seu próprio portfólio.

---

## 👤 Autor

**Vinicius Ribeiro de Mattos**
- 📧 Email: viniciusgg502@gmail.com
- 💼 LinkedIn: [viniciusribeiro](https://linkedin.com/in/vinicius-ribeiro-245945269/)
- 🐙 GitHub: [viniciusribeiro](https://github.com/viniciusribeirom)

---

> *"while(!(succeed = try()));"*
