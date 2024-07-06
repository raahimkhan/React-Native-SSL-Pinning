package com.raahimkhan.ReactNativeSSLPinning // replace with your package name

import com.facebook.react.modules.network.OkHttpClientFactory
import com.facebook.react.modules.network.OkHttpClientProvider
import okhttp3.CertificatePinner
import okhttp3.OkHttpClient

class SSLPinningFactory : OkHttpClientFactory {
    companion object {
        private const val hostname = "jsonplaceholder.typicode.com"
        private val sha256Keys = listOf(
            "sha256/Y/Yn01LUBqEVXKLV67pcXeQY+C0sk8UBCdyULozSQbA=",
            "sha256/kIdp6NNEd8wsugYyyIYFsi1ylMCED3hZbSR8ZFsa/A4=",
            "sha256/mEflZT5enoR1FuXLgYYGqnVEoZvmf9c2bVBpiOjYQ0c="
        )
    }
    override fun createNewNetworkModuleClient(): OkHttpClient {
        val certificatePinnerBuilder = CertificatePinner.Builder()
        for (key in sha256Keys) {
            certificatePinnerBuilder.add(hostname, key)
        }
        val certificatePinner = certificatePinnerBuilder.build()
        val clientBuilder = OkHttpClientProvider.createClientBuilder()
        return clientBuilder.certificatePinner(certificatePinner).build()
    }
}
