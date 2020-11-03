## POC Forms

### Problemas encontrados

#### No bundle url present
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

