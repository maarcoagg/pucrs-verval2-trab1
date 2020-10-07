# Trabalho 1
##### Verificação e Validação de Software II
##### Prof. Daniel Callegari, 2020/2

## Enunciado
Deseja-se um sistema para controlar a alocação de salas de cirurgia em um hospital. As
alocações ocorrem por data, hora de início e hora de término. O tempo mínimo de reserva é
de 2 horas. As reservas somente podem ser feitas entre as 06:00 e não poderão passar das
22:00. As salas de cirurgia são classificadas exclusivamente em três tipos:
 - Salas pequenas,
 - Salas grandes,
 - Salas de alto-risco (se início for antes das 10h, conceder desconto de 10%)
 
Cada tipo de sala possui uma forma de controle de custos, que envolve material básico e
pessoal especializado. As salas pequenas têm o custo de 400,00 por hora; as salas grandes
custam 650,00 por hora e as de alto-risco 1.200,00 por hora. As salas de alto-risco têm um
tempo mínimo de reserva de 3 horas. Os valores-hora devem ser parametrizáveis pelo usuário,
a qualquer momento, em um painel geral de configuração.

As reservas são feitas no nome de um médico cirurgião. Dos médicos é necessário saber o
CRM, o nome e a especialidade. As salas possuem um nome (ex. “Alfa”, “Beta”, “Gama” etc).
Dermatologistas somente poderão fazer reservas de salas pequenas. Cirurgiões
cardiovasculares e neurologistas somente poderão fazer reservas de salas grandes ou de alto-risco.

O sistema deve permitir visualizar a lista de médicos, a lista de salas de cirurgia (por tipo) e a
relação de todas as **alocações** (já realizadas, tempo passado) e **reservas** (tempo futuro). A
listagem das alocações deverá ser feita por um período especificado pelo usuário (data de
início e término) e deverá apresentar o custo correspondente ao período.

Deverá ser possível consultar alocações anteriores  com o aspecto temporal do custo!*). Reservas futuras apresentarão a informação de custo como sendo um orçamento (ou seja, uma previsão de custos).

Deverá ser possível consultar a relação de médicos e o custo total gerado por cada um. Deverá ser possível consultar a relação de salas e o custo total gerado por cada uma. Deverá ser possível criar uma reserva, selecionando-se qual médico deseja qual recurso em qual período futuro. O sistema deverá consistir as datas e horários e a disponibilidade da sala no período desejado. Obviamente a mesma sala não poderá estar em mais de uma reserva na mesma data/horário.

Deverá ser possível excluir uma reserva somente se o prazo for futuro. Não deverá ser possível excluir uma reserva já passada ou em andamento. Também não deverá ser possível alterar uma reserva a qualquer tempo.

Observações:
- *Não é necessário implementar mecanismos de criação, alteração, nem exclusão de médicos ou salas; porém o sistema deverá já ter pelo menos 5 médicos e 10 salas
previamente cadastradas ao iniciar.*
- *Não é necessário ter perfis específicos de acesso ao sistema. Não há necessidade de login.*
- *Não é necessário implementar persistência de dados em arquivos ou bancos de dados. O sistema poderá armazenar tudo em memória volátil, para reduzir o escopo.*
 
## Relatório e Vídeo Demonstrativo do Trabalho
O grupo deverá produzir um relatório contendo:

**1. Folha de rosto com nomes completos dos integrantes.**

**2. Elicitação de Requisitos**
* Lista de requisitos funcionais e não funcionais identificados pelo grupo, no
formato que acharem mais adequado.
* Tabela/checklist de atendimento aos requisitos (sim/não).

**3. Modelagem e Implementação**

* Breve explicação sobre a modelagem do sistema e sua implementação.
* Listar as linguagens, componentes e infraestrutura utilizadas.
* Indicar requisitos necessários para o sistema.

**4. Verificação e Validação (_ênfase do trabalho)**
* Descrição das técnicas de V&V utilizadas pelo grupo
  * No Nível de Integração
  * No Nível de Sistema
 
**5. [Opcional] Link para o software em produção**
* A hospedagem é de responsabilidade do grupo

**6. Link para acesso ao vídeo gravado pelo grupo. O vídeo deve conter:**
* Uma apresentação completa da modelagem, do código e da solução.
* Demonstração do software funcionando.
* Demonstração das técnicas de V&V utilizadas.
*  Resultados dos testes:
   * Cada teste (ou conjunto de testes) individualmente
   * Uma tabela final com os resultados de todos os testes

**7. Conclusão**
* Apresentar uma tabela-resumo dos itens solicitados no trabalho e se foram
concluídos ou não.
* Deverá incluir observações e uma autocrítica do grupo, com as respectivas
responsabilidades (qual aluno trabalhou em qual parte, suas contribuições).

\* *A critério do grupo, alguns dos itens de relatório solicitados acima poderão estar presentes apenas no vídeo produzido pelo grupo, mas apenas se contiverem pelo menos a mesma informação (desejável incluir mais detalhes, por exemplo mostrando código e execução). Se for esta a opção, apenas dizer no texto que tal item está contido no vídeo.*
