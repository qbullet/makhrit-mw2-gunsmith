class DiscordValidator {
  blueprintImagesValidate(_attachments) {
    const attachments = _attachments.map((attachment) => attachment);

    if (!attachments.length) {
      return false;
    }

    attachments.forEach((attachment) => {
      if (!attachment.url.match(/\.(jpeg|jpg|gif|png)$/)) {
        return false;
      }
    });

    return true;
  }
}

export default DiscordValidator;
