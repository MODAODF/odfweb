OC.L10N.register(
    "user_saml",
    {
    "This user account is disabled, please contact your administrator." : "此用户账号已禁用，请联系管理员。",
    "Saved" : "已保存",
    "Provider" : "服务商",
    "Unknown error, please check the log file for more details." : "未知错误，请在日志文件检查更多详情。",
    "Direct log in" : "直接登录",
    "SSO & SAML log in" : "SSO & SAML 登录",
    "This page should not be visited directly." : "此页面不应被直接访问 。",
    "Provider " : "服务商",
    "X.509 certificate of the Service Provider" : "服务商 X.509 认证",
    "Private key of the Service Provider" : "服务商私钥",
    "Indicates that the nameID of the <samlp:logoutRequest> sent by this SP will be encrypted." : "表明 SP 发送的 <samlp:logoutRequest> nameID 将被加密。",
    "Indicates whether the <samlp:AuthnRequest> messages sent by this SP will be signed. [Metadata of the SP will offer this info]" : "指示此SP发送的<samlp:AuthnRequest>消息是否将被签名。 [SP的元数据将提供此信息]",
    "Indicates whether the  <samlp:logoutRequest> messages sent by this SP will be signed." : "指示该 SP 发送的  <samlp:logoutRequest>  消息是否将被签名。",
    "Indicates whether the  <samlp:logoutResponse> messages sent by this SP will be signed." : "指示该 SP 发送的  <samlp:logoutResponse> 消息是否将被签名。",
    "Whether the metadata should be signed." : "元数据是否将被签名。",
    "Indicates a requirement for the <samlp:Response>, <samlp:LogoutRequest> and <samlp:LogoutResponse> elements received by this SP to be signed." : "表示此 SP 接收的 <samlp:Response>，<samlp:LogoutRequest>和<samlp:LogoutResponse> 的要求。",
    "Indicates a requirement for the <saml:Assertion> elements received by this SP to be signed. [Metadata of the SP will offer this info]" : "表示此SP接收到的<saml:Assertion>元素需要签名。 [SP的元数据将提供此信息]",
    "Indicates a requirement for the <saml:Assertion> elements received by this SP to be encrypted." : "表示要对此SP接收到的<saml:Assertion>元素进行加密。",
    " Indicates a requirement for the NameID element on the SAMLResponse received by this SP to be present." : "表示此 SP 收到的 SAMLResponse 上的 NameID 元素的要求。",
    "Indicates a requirement for the NameID received by this SP to be encrypted." : "表示对此 SP 接收到的 NameID 进行加密的要求。",
    "Indicates if the SP will validate all received XML." : "指定 SP 是否验证所有接收到的 XML。",
    "ADFS URL-Encodes SAML data as lowercase, and the toolkit by default uses uppercase. Enable for ADFS compatibility on signature verification." : "ADFS URL - 将 SAML 数据编码为小写，默认情况下，该工具包使用大写。 在签名验证时启用 ADFS 兼容性。",
    "Algorithm that the toolkit will use on signing process." : "该工具包将在签名过程中使用的算法。",
    "Retrieve query parameters from $_SERVER. Some SAML servers require this on SLO requests." : "从 $_SERVER 检索查询参数。一些 SAML 服务器的 SLO 请求需要这个。",
    "Attribute to map the UID to." : "映射到 UID 的属性。",
    "Attribute to map the displayname to." : "映射到显示名称的属性。",
    "Attribute to map the email address to." : "将电子邮件地址映射到的属性。",
    "Attribute to map the quota to." : "要将配额映射到的属性。",
    "Attribute to map the users groups to." : "要映射到用户分组的属性。",
    "Attribute to map the users home to." : "要映射到用户家目录的属性。",
    "Email address" : "电子邮箱地址",
    "Encrypted" : "已加密",
    "Entity" : "实体",
    "Kerberos" : "Kerberos",
    "Persistent" : "持久",
    "Transient" : "临时",
    "Unspecified" : "未明确的",
    "Windows domain qualified name" : "Windows域限定名称",
    "X509 subject name" : "X509主体名称",
    "Use SAML auth for the %s desktop clients (requires user re-authentication)" : "为 %s 桌面客户端使用 SAML 认证（需要重新验证用户）",
    "Optional display name of the identity provider (default: \"SSO & SAML log in\")" : "可选的身份提供者的显示名称（默认：\"SSO及SAML登录\"）",
    "Allow the use of multiple user back-ends (e.g. LDAP)" : "允许使用多个用户后端（例如 LDAP）",
    "SSO & SAML authentication" : "SSO & SAML 认证",
    "Authenticate using single sign-on" : "使用单点登录认证",
    "Using the SSO & SAML app of your Nextcloud you can make it easily possible to integrate your existing Single-Sign-On solution with Nextcloud. In addition, you can use the Nextcloud LDAP user provider to keep the convenience for users. (e.g. when sharing)\nThe following providers are supported and tested at the moment:\n\n* **SAML 2.0**\n\t* OneLogin\n\t* Shibboleth\n\t* Active Directory Federation Services (ADFS)\n\n* **Authentication via Environment Variable**\n\t* Kerberos (mod_auth_kerb)\n\t* Any other provider that authenticates using the environment variable\n\nWhile theoretically any other authentication provider implementing either one of those standards is compatible, we like to note that they are not part of any internal test matrix." : "使用 Nextcloud 的SSO & SAML 应用您可以很容易地将 Nextcloud 与您现有的单点登录解决方案集成。此外，您可以使用 Nextcloud 用户提供者来为用户提供方便。（比如在共享时）\n以下提供者目前受到支持并已通过测试：\n\n* **SAML 2.0**\n\t* OneLogin\n\t* Shibboleth\n\t* Active Directory Federation Services (ADFS)\n\n* **通过环境变量认证**\n\t* Kerberos (mod_auth_kerb)\n\t* 其他任意使用环境变量认证的提供者\n\n虽然理论上来说实现了以上标准之一的任何其他认证提供者都能与此应用兼容，但我们还是要提醒您它们不在内部测试矩阵之中。",
    "Open documentation" : "打开文档",
    "Please choose whether you want to authenticate using the SAML provider built-in in Nextcloud or whether you want to authenticate against an environment variable." : "请选择是否要使用 Nextcloud 内置的 SAML 提供商进行身份验证，还是要根据环境变量进行身份验证。",
    "Use built-in SAML authentication" : "使用内置 SAML 认证",
    "Use environment variable" : "使用环境变量",
    "Global settings" : "全局设置",
    "Remove identity provider" : "移除身份提供者",
    "Add identity provider" : "添加身份提供者",
    "General" : "常规",
    "Service Provider Data" : "数据服务提供商",
    "If your Service Provider should use certificates you can optionally specify them here." : "如果您的服务提供商使用证书，您可以在这里选择指定。",
    "Show Service Provider settings…" : "显示服务器供应商设置...",
    "Name ID format" : "名称ID格式",
    "Identity Provider Data" : "身份提供者的数据",
    "Configure your IdP settings here." : "在这里配置您的 ldP 设置。",
    "Identifier of the IdP entity (must be a URI)" : "IdP 实体的标识符（必须是URI）",
    "URL Target of the IdP where the SP will send the Authentication Request Message" : "URL 的目标，其中 SP 将发送验证请求消息",
    "Show optional Identity Provider settings…" : "显示可选的身份提供者设置...",
    "URL Location of the IdP where the SP will send the SLO Request" : "URL 在 SP 发送 SLO 请求的 IdP 的位置",
    "URL Location of the IDP's SLO Response" : "IDP 的 SLO 响应的 URL 位置",
    "Public X.509 certificate of the IdP" : "公共 X.509 证书的 IdP",
    "Attribute mapping" : "属性映射",
    "If you want to optionally map attributes to the user you can configure these here." : "如果要选择将属性映射到用户，可以在这里配置。",
    "Show attribute mapping settings…" : "显示属性映射设置...",
    "Security settings" : "安全设置",
    "For increased security we recommend enabling the following settings if supported by your environment." : "为了提升安全性，如果您的环境支持，建议启用以下设置。",
    "Show security settings…" : "显示安全设置...",
    "Signatures and encryption offered" : "提供签名和加密",
    "Signatures and encryption required" : "需要签名和加密",
    "Download metadata XML" : "下载元数据 XML",
    "Reset settings" : "重置设置",
    "Metadata invalid" : "元数据无效",
    "Metadata valid" : "元数据有效",
    "Error" : "错误",
    "Account not provisioned." : "账号未配置。",
    "Your account is not provisioned, access to this service is thus not possible." : "您的账号未配置，因此无法访问此服务。",
    "Login options:" : "登录选项：",
    "Choose a authentication provider" : "选择一个认证提供者"
},
"nplurals=1; plural=0;");
