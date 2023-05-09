package hu.kirdev.chatplugin.model

data class MinecraftCommand(
    var type: String = "",
    var arg: String = "",
    var x: Float = 0f,
    var y: Float = 0f,
    var z: Float = 0f,
    var world: String = ""
)