# POC Forms

## Formik / Vanilla / Unform
### Formik
```
+ API enxuta
+ Bem documentado
+ Curva de aprendizado pequena
+ Compatibilidade com Yup para validação

- Não vimos muitos benefícios em relação ao Vanilla.
```

### Vanilla
```
+ Mais controle/adaptabilidade para nossas necessidades
+ API estável
+ Camada de abstração mais superficial

- Precisamos construir o design de tratativa de erros/validação de campos.
```

### Unform
Julgamos pela API e pelas features oferecidas que não superam Formik/Vanilla.

### Conclusão
Levando em conta as diferentes opções, acreditamos que Vanilla é a melhor opção porque nenhuma das outras opções adiciona valor o suficiente para justificar seu custo.

## XState
-

## Uso de Máscaras
Optamos seguir com `react-native-text-input-mask` por sua facilidade de implementação e por estar sendo mantida.
Comparando com máscaras aplicadas manualmente, percebemos um ganho enorme com tempo de trabalho e possíveis bugs que evitamos ao usar essa implementação.

Para o uso dessa lib, é necessário adicionar a seguinte linha ao Podfile:
`pod 'RNInputMask', :path => '../node_modules/react-native-text-input-mask/ios/InputMask'`


## Problemas encontrados

### No bundle url present
Problema encontrado no iOS, foi necessário modificar o arquivo info.plist, localizado em `./ios/forms`.

```diff
-		<key>NSExceptionDomains</key>
-		<dict>
-			<key>localhost</key>
-			<dict>
-				<key>NSExceptionAllowsInsecureHTTPLoads</key>
+        <key>NSAllowsArbitraryLoadsInWebContent</key>
+		    <true/>
+		    <key>NSAllowsLocalNetworking</key>
				<true/>
			</dict>
-		</dict>
-	</dict>
```

### Execução do app em iOS com a lib react-native-text-input-mask
Segundo a documentação da lib, para funcionar em dispositivos iOS, é necessário adicionar
```
	use_frameworks!
	pod 'RNInputMask', :path => '../node_modules/react-native-text-input-mask/ios/InputMask'
```
em `ios/Podfile`. Porém no mesmo arquivo, temos um commentário sobre o Flipper que diz `Note that if you have use_frameworks! enabled, Flipper will not work and you should disable these next few lines.`.

Não conseguimos buildar o app em iOS após seguir essas regras e a build só funcionou após deixarmos o Flipper ativado e removermos `use_frameworks!` que era exigido na implementação de iOS.

```
target 'forms' do
  config = use_native_modules!

  pod 'RNInputMask', :path => '../node_modules/react-native-text-input-mask/ios/InputMask'

  # Enables Flipper.
  #
  # Note that if you have use_frameworks! enabled, Flipper will not work and
  # you should disable these next few lines.
  use_flipper!
  post_install do |installer|
    flipper_post_install(installer)
  end
end
```

