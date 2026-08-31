    // Obtém o botão e o menu de opções
    var button = document.getElementById("menu-button");
    var menu = document.getElementById("menu-options");

    // Adiciona um evento de clique ao botão
    button.addEventListener("click", function() {
        // Verifica se o menu de opções está sendo exibido
        if (menu.style.display === "none") {
            // Exibe o menu de opções
            menu.style.display = "block";
        } else {
            // Oculta o menu de opções
            menu.style.display = "none";
        }
    });

    // Tamanho da fonte padrão
    var defaultFontSize = 100;
    var fontSize = defaultFontSize;

    function increaseText() {
        fontSize += 10;
        document.body.style.fontSize = fontSize + "%";
        localStorage.setItem('fontSize', fontSize);
    }

    function resetText() {
        fontSize = defaultFontSize;
        document.body.style.fontSize = fontSize + "%";
        localStorage.setItem('fontSize', fontSize);
    }

    function decreaseText() {
        fontSize -= 10;
        document.body.style.fontSize = fontSize + "%";
        localStorage.setItem('fontSize', fontSize);
    }

    function tornarSiteCinza() {
        var element = document.body;
        element.classList.toggle("grayscale");
    }

    function toggleContrast() {
        var element = document.body;
        element.classList.toggle("contrast");
    }

    function toggleNegative() {
        var element = document.body;
        element.classList.toggle("negative");
    }

    function toggleLight() {
        var element = document.body;
        element.classList.toggle("light");
    }

    function toggleUnderline() {
        var element = document.body;
        element.classList.toggle("underline-links");
    }

    function toggleReadableFont() {
        var element = document.body;
        element.classList.toggle("readable-font");
    }

    // Função leitordeTela
    function leitordeTela() {
        // Seleciona o elemento principal
        let mainElement = document.getElementById('main-content');

        // Obtém todo o texto dentro do elemento principal
        let text = mainElement.innerText;

        // Divide o texto em palavras
        let words = text.split(' ');

        // Índice da palavra atual
        let currentWordIndex = 0;

        // Função para remover o destaque de todas as palavras
        function removeHighlight() {
            mainElement.innerHTML = mainElement.innerHTML.replace(
                /<span style="border: 1px solid black; background-color: yellow;">(.*?)<\/span>/g, '$1');
        }

        // Função para destacar uma palavra em amarelo
        function highlightWord(word) {
            let innerHTML = mainElement.innerHTML;
            let index = innerHTML.indexOf(word);
            if (index >= 0) {
                innerHTML = innerHTML.substring(0, index) +
                    "<span style='border: 1px solid black; background-color: yellow;'>" + innerHTML.substring(index,
                        index + word.length) + "</span>" + innerHTML.substring(index + word.length);
                mainElement.innerHTML = innerHTML;
            }
        }

        // Função para falar uma palavra e destacá-la
        function speakAndHighlightWord() {
            if (currentWordIndex < words.length) {
                // Remove o destaque das palavras anteriores
                removeHighlight();

                // Destaca as próximas quatro palavras
                for (let i = 0; i < 4; i++) {
                    if (currentWordIndex + i < words.length) {
                        highlightWord(words[currentWordIndex + i]);
                    }
                }

                // Cria uma nova instância de SpeechSynthesisUtterance
                let utterance = new SpeechSynthesisUtterance(words.slice(currentWordIndex, currentWordIndex + 4).join(
                    ' '));

                // Fala as palavras usando a API de síntese de fala
                window.speechSynthesis.speak(utterance);

                // Incrementa o índice da palavra atual
                currentWordIndex += 4;

                // Chama esta função novamente quando as palavras atuais terminarem de ser faladas
                utterance.onend = function(event) {
                    setTimeout(speakAndHighlightWord, 100); // Adiciona um atraso de 100ms
                };
            }
        }

        // Inicia o leitor de tela
        speakAndHighlightWord();
    }

    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    function getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    function toggle(className) {
        var element = document.body;
        var isActive = element.classList.toggle(className);
        setCookie(className, isActive ? 'true' : 'false', 30);
    }

    // Função para redefinir as configurações
    function resetSettings() {
        ['grayscale', 'contrast', 'negative', 'light', 'underline-links', 'readable-font'].forEach(function(className) {
            document.body.classList.remove(className);
            setCookie(className, 'false', 30);
            fontSize = defaultFontSize;
            document.body.style.fontSize = fontSize + "%";
        });
    }

    window.onload = function() {
        ['grayscale', 'contrast', 'negative', 'light', 'underline-links', 'readable-font'].forEach(function(
            className) {
            if (getCookie(className) === 'true') {
                document.body.classList.add(className);
            }
        });
    }
