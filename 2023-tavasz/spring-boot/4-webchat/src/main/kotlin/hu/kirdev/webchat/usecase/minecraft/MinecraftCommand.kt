package hu.kirdev.webchat.usecase.minecraft

data class MinecraftCommand(
    var type: String,
    var arg: String,
    var x: Float,
    var y: Float,
    var z: Float,
    var world: String
)