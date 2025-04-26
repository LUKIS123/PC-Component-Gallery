using ComponentGallery.Server.Features.Components.GetComponentAssets;
using Microsoft.AspNetCore.Mvc;

namespace ComponentGallery.Server.Features.Components.UploadComponentAssets;

public static class UploadComponentAssetEndpoint
{
    public static void MapUploadComponentAssetEndpoint(this IEndpointRouteBuilder endpointRouteBuilder)
    {
        endpointRouteBuilder.MapPost(
            "/api/assents/components/{componentId}",
            async (
                [FromRoute] int componentId,
                [FromForm] IFormFile file,
                [FromServices] GetComponentAssetHandler handler,
                CancellationToken cancellationToken) =>
            {
                if (file.Length == 0)
                {
                    return Results.BadRequest("File is empty.");
                }

                using var memoryStream = new MemoryStream();
                await file.CopyToAsync(memoryStream, cancellationToken);

                // var request = new SaveConversationImageRequest
                // {
                //     ConversationId = chatId,
                //     Image = memoryStream.ToArray(),
                //     FileExtension = Path.GetExtension(file.FileName)
                // };
                //
                // await conversationImageService.SaveConversationImage(request);
                return Results.Ok();
            })
            .DisableAntiforgery();
    }
}
